import { EnchantItem } from './Item';
import { EnchantType } from './ItemTypes';

export class EnduranceEnchantItem extends EnchantItem {
    constructor(level: number) {
        super(EnchantType.Endurance, level);
    }
}

export class SharpnessEnchantItem extends EnchantItem {
    constructor(level: number) {
        super(EnchantType.Sharpness, level);
    }
}
