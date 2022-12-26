import { addUser, getUserInfo } from '../db/controller/UserController';
import { UsersTable } from '../types/UserTable';

test('添加用户', async () => {
    var user: UsersTable = await addUser(114514, '先辈');
    console.log(user);
});
test('查询用户', async () => {
    var user: UsersTable = await getUserInfo(114514);
    console.log(user);
    var nonUser: UsersTable = await getUserInfo(0);
    console.log(nonUser);
});
