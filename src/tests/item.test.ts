import {
    EnduranceEnchantItem,
    SharpnessEnchantItem,
} from '../game/items/enchantItems';

test('附魔物品创建', () => {
    var sharpness1 = new SharpnessEnchantItem(1);
    var sharpness5 = new SharpnessEnchantItem(5);
    var endurance2 = new EnduranceEnchantItem(2);
    console.log(sharpness1, sharpness5, endurance2);
});
