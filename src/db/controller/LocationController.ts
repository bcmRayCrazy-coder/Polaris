import { getHash } from "../../game/lib";
import { Locations } from "../../game/map";
import { connection } from "../connect";
import { Tables } from "../tables";
import { LocationTable } from "../types/LocationTable";

/**
 * 初始化用户位置
 * @param id 用户id
 */
export async function initUserLocation(id:number) {
    await connection(Tables.Locations).insert({hash:getHash(),id,location:Locations.lobby})
}

/**
 * 获取指定用户的位置
 * @param id 用户id
 * @returns 用户位置
 */
export async function getUserLocation(id:number):Promise<LocationTable>{
    return (await connection.select().where({id}).from(Tables.Locations))[0];
}

/**
 * 获取指定位置的用户
 * @param location 位置
 * @returns 在该位置的所有用户位置信息
 */
export async function getLocationUsers(location:Locations):Promise<LocationTable[]>{
    return await connection.select().where({location}).from(Tables.Locations);
}