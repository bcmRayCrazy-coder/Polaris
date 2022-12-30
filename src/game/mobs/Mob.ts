import { mobName } from '../data';
import { Item } from '../items/Item';

export class Mob {
    /**
     * 实体id
     */
    id: string;

    /**
     * 实体名称
     */
    name: string;

    /**
     * 实体实际血量
     */
    health: number;

    /**
     * 实体最大血量
     */
    maxHealth: number;

    /**
     * 实体死亡掉落物
     */
    dropItem: Item[];

    /**
     * 掉落数量
     */
    dropAmount: number[];

    /**
     * 击败后获得的经验值
     */
    exp: number;

    /**
     * 击败后获得的硬币
     */
    coin: number;

    /**
     * 攻击伤害随机乘数
     * 计算方式: 0~1之间的随机小数 x attack + minAttack
     */
    attack: number;

    /**
     * 攻击最小伤害
     * 计算方式参看attack
     */
    minAttack: number;

    /**
     * 初始化实体数据
     * @param id 实体id
     * @param health 实体伤害
     * @param dropItem 实体掉落物
     * @param dropAmount 实体掉落物品数量
     * @param exp 实体掉落经验
     * @param coin 实体掉落硬币
     * @param attack 实体攻击伤害乘数
     * @param minAttack 实体攻击最小伤害
     */
    constructor(
        id: string,
        health: number,
        dropItem: Item[],
        dropAmount: number[],
        exp: number,
        coin: number,
        attack: number,
        minAttack: number
    ) {
        this.id = id;
        this.name = mobName[id] || id;
        this.health = health;
        this.maxHealth = health;
        this.dropItem = dropItem;
        this.dropAmount = dropAmount;
        this.exp = exp;
        this.coin = coin;
        this.attack = attack;
        this.minAttack = minAttack;
    }

    /**
     * 获取实体攻击实际伤害值
     * @returns 实体攻击实际伤害值
     */
    getAttack(): number {
        return Math.random() * this.attack + this.minAttack;
    }

    /**
     * 实体受到伤害
     * @param health 受到的伤害值
     */
    hurt(health: number) {
        this.health -= health;
        if (this.health < 0) this.health = 0;
    }

    /**
     * 实体是否死亡
     * @returns 是否死亡
     */
    isDied(): boolean {
        return this.health <= 0;
    }
}
