import {
    getUserInfo,
    updateUserInfo,
} from '../../../db/controller/UserController';
import { client } from '../../bot';
import { info2text } from '../../lib';
import { Command, CommandExecutor } from '../Command';
import { adminCommandManager } from './admin';

class UserAdminCommand extends Command {
    constructor() {
        super('用户', '关于用户的管理');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length < 1) {
            client.sendGroupMsg(executor.groupId, this.help());
            return false;
        }
        switch (args[0]) {
            case '查看信息':
                var info = await getUserInfo(Number.parseInt(args[1]));
                if (!info) client.sendGroupMsg(executor.groupId, '用户不存在');
                else client.sendGroupMsg(executor.groupId, info2text(info));
                break;

            case '修改信息':
                if (args.length != 4)
                    client.sendGroupMsg(executor.groupId, '语法错误');
                var info = await getUserInfo(Number.parseInt(args[1]));
                if (!info) client.sendGroupMsg(executor.groupId, '用户不存在');
                var target = args[3];
                switch (args[2]) {
                    case '硬币':
                        info.coin = Number.parseInt(target);
                        break;

                    case '等级':
                        info.level = Number.parseInt(target);
                        break;

                    case 'VIP':
                        info.vip = Number.parseInt(target);
                        break;

                    case '经验值':
                        info.exp = Number.parseFloat(target);
                        break;

                    case '血量':
                        info.health = Number.parseFloat(target);
                        break;

                    case '管理员':
                        info.admin = target == '是';
                        break;

                    default:
                        break;
                }
                await updateUserInfo(info);
                client.sendGroupMsg(executor.groupId, '修改成功!');
                break;

            default:
                client.sendGroupMsg(executor.groupId, this.help());
                return false;
        }
        return true;
    }
    help(): string {
        return `管理用户
1. 查看信息
#管理 用户 查看信息 <目标QQ号>
如: 查看用户123的用户信息 #管理 用户 查看信息 123

2.修改信息
#管理 用户 修改信息 <目标QQ号> <硬币|等级|经验值|血量|管理员|VIP> <目标值>
如: 将用户123设置为管理员 #管理 用户 修改信息 管理员 是`;
    }
}

adminCommandManager.register(new UserAdminCommand());
