import { EnchantType, ItemType } from './items/ItemTypes';

/**
 * 升级经验
 * value为升到index + 1级所需的经验
 */
export let levelUpExp: number[] = [50, 100, 100, 250, 500, 1000, 1000, 2000];

/**
 * 等级称号
 */
export let levelName:string[] = ['练习生','实习探险家','新探险家','探险家','经验探险家','富有经验的探险家','探险大佬','北极之星'];

/**
 * VIP等级称呼
 */
export let vipName: string[] = ['普通探险家', 'VIP', '--SVIP--', '====超级VIP===='];

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

/**
 * Mob称呼
 */
export let mobName: Record<string, string> = {
    // 僵尸
    'mob.zombie.normal': '普通僵尸',
    'mob.zombie.advanced': '进阶僵尸',
    'mob.zombie.high': '高级僵尸',
    'mob.zombie.super': '超级僵尸',
    // 铁怪
    'mob.iron.small': '小铁怪',
    'mob.iron.medium': '中铁怪',
    'mob.iron.big': '大铁怪',
    // boss
    'mob.boss.iron': '铁怪boss',
};
