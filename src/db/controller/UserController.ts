import { UsersTable } from '../types/UserTable';
import { connection } from '../connect';
import { Tables } from '../tables';

export async function getUserInfo(id: number): Promise<UsersTable> {
    return (await connection.select('*').from(Tables.Users).where({ id }))[0];
}

export async function addUser(id: number, name: string): Promise<UsersTable> {
    if (!(await getUserInfo(id))) {
        await connection(Tables.Users).insert({ id, name });
    }
    return await getUserInfo(id);
}

export async function updateUserInfo(info: UsersTable) {
    await connection(Tables.Users).where({ id: info.id }).update(info);
}
