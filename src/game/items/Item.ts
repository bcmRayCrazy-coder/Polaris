import {
    getUserInfo,
    updateUserInfo,
} from '../../db/controller/UserController';
import { enchantTypeName } from '../data';
import { connect2id } from '../lib';
import {
    ItemType,
    EnchantType,
    AttackItemMetadata,
    FoodItemMetadata,
    PropItemMetadata,
    EnchantItemMetadata,
    AttackItemUseResponse,
} from './ItemTypes';

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
