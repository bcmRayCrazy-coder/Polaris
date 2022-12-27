import { connection } from '../connect';
import { Tables } from '../tables';
import { TreasureTable } from '../types/TreasureTable';

export async function addTreasure(
    owner: number,
    level: number
): Promise<number> {
    return await connection(Tables.Treasures).insert({ owner, level });
}

export async function getTreasure(id: number): Promise<TreasureTable> {
    return (
        await connection.select('*').from(Tables.Treasures).where({ id })
    )[0];
}

export async function getUserTreasureList(
    owner: number
): Promise<TreasureTable[]> {
    return await connection.select('*').from(Tables.Treasures).where({ owner });
}

export async function removeTreasure(id: number): Promise<void> {
    await connection.where({ id }).delete();
}
