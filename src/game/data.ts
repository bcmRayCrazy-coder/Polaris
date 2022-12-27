import { EnchantType, ItemType } from './items/ItemTypes';

/**
 * 升级经验
 * value为升到index + 1级所需的经验
 */
export let levelUpExp: number[] = [50, 100, 100, 250, 500, 1000, 1000, 2000];

/**
 * VIP等级称呼
 */
export let vipName: string[] = ['探险家', 'VIP', '--SVIP--', '====超级VIP===='];

/**
 * VIP签到加成
 */
export let vipSigninAddon: number[] = [0, 50, 200, 500];

/**
 * 物品类型称呼
 */
export let itemTypeName: Record<string, string> = {
    [ItemType.Attack]: '攻击',
    [ItemType.Food]: '食物',
    [ItemType.Prop]: '道具',
    [ItemType.Enchant]: '附魔',
};

/**
 * 附魔属性称呼
 */
export let enchantTypeName: Record<string, string> = {
    [EnchantType.Endurance]: '耐久',
    [EnchantType.Sharpness]: '锋利',
};
