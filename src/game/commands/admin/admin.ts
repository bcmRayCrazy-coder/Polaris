import { getUserInfo } from '../../../db/controller/UserController';
import { success } from '../../../logger';
import { client } from '../../bot';
import { Command, CommandExecutor, CommandManager } from '../Command';
import { commandManager } from '../CommandManager';

export let adminCommandManager = new CommandManager();

adminCommandManager.onCommandNotFound = function (
    name: string,
    args: string[],
    executor: CommandExecutor
) {
    client.sendGroupMsg(
        executor.groupId,
        `
指令 #管理 ${name} 不存在! 输入 #管理 帮助 查看管理指令帮助`
    );
};

class AdminCommand extends Command {
    constructor() {
        super('管理', '管理员使用, 用于管理机器人');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (!(await getUserInfo(executor.id)).admin) {
            client.sendGroupMsg(
                executor.groupId,
                '#管理 指令仅管理员可使用, 您还不是管理员'
            );
            return true;
        }
        if (args.length < 1) return false;
        var cmd = args.slice(1);

        await adminCommandManager.execute(args[0], cmd, executor);

        return true;
    }
    help(): string {
        return `管理员手册
#帮助       - 查看帮助
#管理 用户  - 关于用户信息的管理
        `;
    }
}

commandManager.register(new AdminCommand());

import './user';
success('管理 子插件导入完成');
