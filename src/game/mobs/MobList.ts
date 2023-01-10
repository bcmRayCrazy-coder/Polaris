import { Mob } from './Mob';
import { ZombieAdvanced, ZombieHigh, ZombieNormal } from './mobs';

export let MobList: Record<string, typeof Mob> = {
    zombieNormal: ZombieNormal,
    zombieAdvanced: ZombieAdvanced,
    zombieHigh: ZombieHigh,
};
