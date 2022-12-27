import { signedToday, signin } from '../../db/controller/SigninController';
import {
    getUserInfo,
    updateUserInfo,
} from '../../db/controller/UserController';
import { client } from '../bot';
import { vipSigninAddon } from '../data';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

class SigninCommand extends Command {
    constructor() {
        super('签到', '每天都可以进行一次签到');
    }
    async beforeExecute(
        args: string[],
        executor: CommandExecutor
    ): Promise<boolean> {
        if (await signedToday(executor.id)) {
            client.sendGroupMsg(
                executor.groupId,
                '你今天已经签到过了, 明天再来吧!'
            );
            return false;
        }
        return true;
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        var coin = Math.ceil(Math.random() * 100) + 50;
        var userInfo = await getUserInfo(executor.id);

        coin += vipSigninAddon[userInfo.vip];
        signin(executor.id);
        await updateUserInfo({
            ...userInfo,
            coin: userInfo.coin + coin,
            exp: userInfo.exp + 10,
        });

        client.sendGroupMsg(
            executor.groupId,
            `签到成功, 获得 ${coin} 硬币, 10经验值!` +
                (userInfo.vip > 0
                    ? `VIP硬币加成 ${vipSigninAddon[userInfo.vip]}`
                    : '')
        );
        return true;
    }
    help(): string {
        return '用法: #签到';
    }
}

commandManager.register(new SigninCommand());
