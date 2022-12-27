import { AttackItem } from './Item';

export class StoneAttackItem extends AttackItem {
    constructor() {
        super('stone', '石头', 1, 1);
    }
}

export class StoneSwordAttackItem extends AttackItem {
    constructor() {
        super('stone_sword', '石剑', 3, 20);
    }
}

export class GoldenSwordAttackItem extends AttackItem {
    constructor() {
        super('golden_sword', '金剑', 6, 10);
    }
}

export class PencilAttackItem extends AttackItem {
    constructor() {
        super('pencil', '坚硬铅笔', 8, 1);
    }
}

export class IronBlockAttackItem extends AttackItem {
    constructor() {
        super('iron_block', '超级铁块', 15, 1);
    }
}
