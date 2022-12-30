import { getHash } from '../../game/lib';
import { connection } from '../connect';
import { Tables } from '../tables';
import { ItemTable } from '../types/ItemTable';

export async function addItem(
    owner: number,
    id: string,
    metadata?: Object,
    name?: string
): Promise<string> {
    var hash: string = getHash();
    await connection(Tables.Items).insert({});
    return hash;
}

export async function getItemByHash(hash: string): Promise<ItemTable> {
    return (await connection.select('*').where({ hash }).from(Tables.Items))[0];
}

export async function getUserItems(owner: number): Promise<ItemTable[]> {
    return await connection.select('*').where({ owner }).from(Tables.Items);
}
