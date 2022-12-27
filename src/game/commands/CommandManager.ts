import { client } from '../bot';
import { CommandExecutor, CommandManager } from './Command';

export let commandManager = new CommandManager();
commandManager.onCommandBack = (
    name: string,
    args: string[],
    success: boolean,
    executor: CommandExecutor
) => {
    if (!success)
        client.sendGroupMsg(
            executor.groupId,
            `指令 ${name} 执行失败, 这是它的帮助文档:\n` +
                commandManager.commands[name].help()
        );
};
commandManager.onCommandNotFound = (
    name: string,
    args: string[],
    executor: CommandExecutor
) => {
    client.sendGroupMsg(executor.groupId, `指令 ${name} 不存在!`);
};

import './signin';
import './help';
import './me';
import './admin/admin';