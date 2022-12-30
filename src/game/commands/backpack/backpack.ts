import { success } from '../../../logger';
import { client } from '../../bot';
import { Command, CommandExecutor, CommandManager } from '../Command';
import { commandManager } from '../CommandManager';

export let backpackCommandManager = new CommandManager();

backpackCommandManager.onCommandBack = (
    name: string,
    args: string[],
    success: boolean,
    executor: CommandExecutor
) => {
    if (!success)
        client.sendGroupMsg(
            executor.groupId,
            `指令 #背包 ${name} ${args.join(
                ' '
            )} 执行失败, 这是它的帮助文档:\n` +
                backpackCommandManager.commands[name].help()
        );
};
backpackCommandManager.onCommandNotFound = function (
    name: string,
    args: string[],
    executor: CommandExecutor
) {
    client.sendGroupMsg(
        executor.groupId,
        `指令 #背包 ${name} 不存在! 输入 #背包 帮助 查看管理指令帮助`
    );
};

class BackpackCommand extends Command {
    constructor() {
        super('背包', '我的背包');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length < 1) return false;
        var cmd = args.slice(1);

        await backpackCommandManager.execute(args[0], cmd, executor);
        return true;
    }
    help(): string {
        return `背包指令帮助
#背包 查看  - 查看我的背包里有什么`;
    }
}

commandManager.register(new BackpackCommand());

import './view';
success('背包 子插件导入完成');
