import {
    EnduranceEnchantItem,
    SharpnessEnchantItem,
} from '../game/items/enchantItems';
import { IronBlockAttackItem } from '../game/items/attackItems';

test('附魔物品创建', () => {
    var sharpness1 = new SharpnessEnchantItem(1);
    var sharpness5 = new SharpnessEnchantItem(5);
    var endurance2 = new EnduranceEnchantItem(2);
    console.log('锋利1:', sharpness1);
    console.log('锋利5:', sharpness5);
    console.log('耐久2:', endurance2);
});
test('攻击物品创建并使用', () => {
    var attack = new IronBlockAttackItem();
    console.log('物品状态', attack.isInvalid() ? '不可用' : '可用');
    console.log('在生物上使用', attack.useOnMob());
    console.log('物品状态', attack.isInvalid() ? '不可用' : '可用');
    console.log('在生物上使用', attack.useOnMob());
});
