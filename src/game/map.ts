/**
 * 游戏地图
 * 包括地图中的怪物都在这里声明
 */

import { Mob } from './mobs/Mob';
import { MobList } from './mobs/MobList';

/**
 * 位置枚举
 */
export enum Locations {
    // 平日聚集
    lobby = 'lobby',
    // 刷普通僵尸
    lobbySuburbsEast = 'lobbySuburbsEast',
    lobbySuburbsWest = 'lobbySuburbsWest',
    lobbySuburbsSouth = 'lobbySuburbsSouth',
    // 购买铁制品
    ironCity = 'ironCity',
    // 刷铁怪
    ironSuburbsEast = 'ironSuburbsEast',
}

/**
 * 位置的称呼
 */
export let locationName: Record<Locations, string> = {
    [Locations.lobby]: '主营地',
    [Locations.lobbySuburbsEast]: '主营地东郊区',
    [Locations.lobbySuburbsWest]: '主营地西郊区',
    [Locations.lobbySuburbsSouth]: '主营地南郊区',
    [Locations.ironCity]: '铁城',
    [Locations.ironSuburbsEast]: '铁城东郊区',
};

/**
 * 位置到主城的距离 单位: 公里km
 * 这里将所有位置想象成一维上的点, 只能左右走动(不过对用户不能这样说)
 */
export let locationDistance: Record<Locations, number> = {
    [Locations.lobby]: 0,
    [Locations.lobbySuburbsEast]: 2,
    [Locations.lobbySuburbsWest]: 2,
    [Locations.lobbySuburbsSouth]: 2,
    [Locations.ironCity]: 4,
    [Locations.ironSuburbsEast]: 5,
};

export let locationMobs: Record<Locations, typeof Mob[]> = {
    [Locations.lobby]: [],
    [Locations.lobbySuburbsEast]: [
        MobList['zombieNormal'],
        MobList['zombieNormal'],
        MobList['zombieAdvanced'],
    ],
    [Locations.lobbySuburbsWest]: [
        MobList['zombieNormal'],
        MobList['zombieNormal'],
    ],
    [Locations.lobbySuburbsSouth]: [
        MobList['zombieNormal'],
        MobList['zombieNormal'],
        MobList['zombieHigh'],
    ],
    [Locations.ironCity]: [],
    [Locations.ironSuburbsEast]: [],
};
