import {
    getUserInfo,
    updateUserInfo,
} from '../../db/controller/UserController';
import { enchantTypeName } from '../data';
import { connect2id } from '../lib';

export enum ItemType {
    /**
     * 攻击类
     */
    Attack = 'attack',

    /**
     * 食物类
     */
    Food = 'food',

    /**
     * 道具类
     */
    Prop = 'prop',

    /**
     * 附魔类
     */
    Enchant = 'enchant',
}
export enum EnchantType {
    /**
     * 耐久
     */
    Endurance = 'endurance',

    /**
     * 锋利
     */
    Sharpness = 'sharpness',
}

export interface AttackItemMetadata {
    type: ItemType.Attack;

    /**
     * 物品伤害
     */
    damage: number;

    /**
     * 物品剩余耐久
     */
    endurance: number;

    /**
     * 物品总耐久
     */
    totalEndurance: number;

    /**
     * 物品附魔属性
     */
    enchants: EnchantItem[];
}
export interface FoodItemMetadata {
    type: ItemType.Food;
}
export interface PropItemMetadata {
    type: ItemType.Prop;
}
export interface EnchantItemMetadata {
    type: ItemType.Enchant;

    /**
     * 附魔类型
     */
    enchantType: EnchantType;

    /**
     * 附魔等级
     */
    level: number;
}

/**
 * 攻击类物品use函数返回内容
 */
export interface AttackItemUseResponse {
    /**
     * 是否成功
     */
    success: boolean;

    /**
     * 实际伤害
     */
    damage?: number;

    /**
     * 实际消耗耐久
     */
    endurance?: number;
}

export class Item {
    id: string;
    name: string;
    metadata: Object;
    type: ItemType;

    constructor(id: string, name: string, type: ItemType, metadata?: Object) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.metadata = metadata || {};
    }

    /**
     * 获取用于存储在数据库的物品metadata
     * @returns 物品metadata
     */
    getItemMetadata(): Object {
        return {
            type: this.type,
            ...this.metadata,
        };
    }
}

export class AttackItem extends Item {
    metadata: AttackItemMetadata;

    constructor(id: string, name: string, damage: number, endurance: number) {
        var md: AttackItemMetadata = {
            type: ItemType.Attack,
            damage,
            endurance,
            totalEndurance: endurance,
            enchants: [],
        };
        id = connect2id('item', ItemType.Attack, id);
        super(id, name, ItemType.Attack, md);
        this.metadata = md;
    }

    async use(targetId: number): Promise<AttackItemUseResponse> {
        if (this.isInvalid()) return { success: false };
        var damage = this.getActualDamage(this.metadata.damage);
        var endurance = this.getActualEndurance(damage);

        var targetUser = await getUserInfo(targetId);
        targetUser.health -= damage;
        updateUserInfo(targetUser);
        this.metadata.endurance -= endurance;

        return { success: true, damage, endurance };
    }

    /**
     * 附魔
     * @param enchantItem 附魔物品
     */
    enchant(enchantItem: EnchantItem) {
        if (
            this.metadata.enchants.filter(
                (v) => v.metadata.type == enchantItem.type
            ).length != 0
        ) {
            this.metadata.enchants = this.metadata.enchants.map((v) => {
                if (v.metadata.type == enchantItem.type)
                    v.metadata.level = enchantItem.metadata.level;
                return v;
            });
        } else {
            this.metadata.enchants.push(enchantItem);
        }
    }

    /**
     * 获取实际消耗的耐久值
     * @param need 需要消耗的耐久
     */
    getActualEndurance(v: number): number {
        var need = v;
        for (let i = 0; i < this.metadata.enchants.length; i++) {
            const e = this.metadata.enchants[i];
            if (e.metadata.enchantType == EnchantType.Endurance)
                v = Math.ceil(v / 2);
        }
        return need;
    }

    /**
     * 获取实际伤害值
     * @param v 伤害
     */
    getActualDamage(v: number): number {
        var damage = v;
        for (let i = 0; i < this.metadata.enchants.length; i++) {
            const e = this.metadata.enchants[i];
            if (e.metadata.enchantType == EnchantType.Sharpness)
                damage += e.metadata.level * 0.8;
        }
        return damage;
    }

    /**
     * 物品耐久消耗完需要作废
     * @return 是否已作废
     */
    isInvalid(): boolean {
        return this.metadata.endurance <= 0;
    }
}

export class EnchantItem extends Item {
    metadata: EnchantItemMetadata;
    constructor(type: EnchantType, level: number) {
        var md: EnchantItemMetadata = {
            type: ItemType.Enchant,
            enchantType: type,
            level,
        };
        super(
            connect2id('item', ItemType.Enchant, type),
            enchantTypeName[type],
            ItemType.Enchant,
            md
        );
        this.metadata = md;
    }
}
