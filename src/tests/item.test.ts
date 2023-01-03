import {
    EnduranceEnchantItem,
    SharpnessEnchantItem,
} from '../game/items/enchantItems';
import {
    GoldenSwordAttackItem,
    IronBlockAttackItem,
    PencilAttackItem,
    StoneAttackItem,
    StoneSwordAttackItem,
} from '../game/items/attackItems';

test('全物品创建', () => {
    new StoneAttackItem();
    new StoneSwordAttackItem();
    new GoldenSwordAttackItem();
    new PencilAttackItem();
    new IronBlockAttackItem();
});

test('附魔物品创建', () => {
    var sharpness1 = new SharpnessEnchantItem(1);
    var sharpness5 = new SharpnessEnchantItem(5);
    var endurance2 = new EnduranceEnchantItem(2);
    console.log('锋利1:', sharpness1);
    console.log('锋利5:', sharpness5);
    console.log('耐久2:', endurance2);
    console.log('锋利1的metadata:', sharpness1.getItemMetadata());
});
test('攻击物品创建并使用', () => {
    var attack = new IronBlockAttackItem();
    console.log('物品状态', attack.isInvalid() ? '不可用' : '可用');
    console.log('在生物上使用', attack.useOnMob());
    console.log('物品状态', attack.isInvalid() ? '不可用' : '可用');
    console.log('在生物上使用', attack.useOnMob());
});
