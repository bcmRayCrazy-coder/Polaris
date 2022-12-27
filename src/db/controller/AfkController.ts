import { connection } from "../connect";
import { Tables } from "../tables";
import { AfkTable } from "../types/AfkTable";

export async function startAfk(id:number):Promise<AfkTable>{
    return await connection(Tables.Afk).insert({id});
}

export async function getAfkData(id:number):Promise<AfkTable>{
    return (await connection.select().where({id}).from(Tables.Afk))[0];
}

export async function stopAfkid(id:number):Promise<AfkTable>{
    var data = getAfkData(id);
    await connection(Tables.Afk).where({id}).delete();
    return data;
}