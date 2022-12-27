import { EnchantItem } from './Item';

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
