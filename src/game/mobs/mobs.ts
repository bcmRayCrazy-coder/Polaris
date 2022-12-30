import { StoneAttackItem, StoneSwordAttackItem } from '../items/attackItems';
import { Mob } from './Mob';

export class ZombieNormal extends Mob {
    constructor() {
        super(
            'mob.zombie.normal',
            5,
            [new StoneAttackItem()],
            [Math.round(Math.random() * 2)],
            Math.round(Math.random() * 5),
            Math.round(Math.random() * 6),
            1,
            0.4
        );
    }
}

export class ZombieAdvanced extends Mob {
    constructor() {
        super(
            'mob.zombie.advanced',
            10,
            [new StoneAttackItem(), new StoneSwordAttackItem()],
            [Math.round(Math.random() * 3), Math.round(Math.random() * 1)],
            Math.round(Math.random() * 8),
            Math.round(Math.random() * 10),
            2,
            1
        );
    }
}

export class ZombieHigh extends Mob {
    constructor() {
        super(
            'mob.zombie.high',
            20,
            [new StoneAttackItem(), new StoneSwordAttackItem()],
            [Math.round(Math.random() * 5), Math.round(Math.random() * 8)],
            Math.round(Math.random() * 15),
            Math.round(Math.random() * 20),
            5,
            3
        );
    }
}
