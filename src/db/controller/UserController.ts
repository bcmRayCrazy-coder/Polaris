import { UsersTable } from '../types/UserTable';
import { connection } from '../connect';
import { Tables } from '../tables';
import botConfig from '../../bot.config';
import { info } from '../../logger';

export async function getUserInfo(id: number): Promise<UsersTable> {
    return (await connection.select('*').from(Tables.Users).where({ id }))[0];
}

export async function addUser(id: number, name: string): Promise<UsersTable> {
    var admin = false;
    if (botConfig.adminId.includes(id)) {
        admin = true;
        info('发现管理员', id.toString(), '已自动将ta设置为管理!');
    }
    if (!(await getUserInfo(id))) {
        await connection(Tables.Users).insert({ id, name, admin });
    }
    return await getUserInfo(id);
}

export async function updateUserInfo(info: UsersTable) {
    await connection(Tables.Users).where({ id: info.id }).update(info);
}

export async function deleteUser(id: number) {
    await connection(Tables.Users).where({ id }).delete();
}
