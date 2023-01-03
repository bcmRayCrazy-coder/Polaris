import {
    addUser,
    deleteUser,
    getUserInfo,
    updateUserInfo,
} from '../db/controller/UserController';
import { UsersTable } from '../db/types/UserTable';

test('添加用户', async () => {
    var user: UsersTable = await addUser(114514, '先辈');
    console.log('新用户信息:', user);
});

test('查询用户', async () => {
    var user: UsersTable = await getUserInfo(114514);
    console.log('id为114514的用户信息:', user);
    var nonUser: UsersTable = await getUserInfo(0);
    console.log('不存在的用户信息:', nonUser);
});

test('更新用户信息', async () => {
    var user: UsersTable = await getUserInfo(114514);
    user.coin = 999999;
    updateUserInfo(user);
    user = await getUserInfo(114514);
    console.log('更新后信息:', user);
});

test('删除用户', async () => {
    await deleteUser(114514);
});

// test('空', () => {});
