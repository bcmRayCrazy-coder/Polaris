import { client } from '../bot';
import { CommandExecutor, CommandManager } from './Command';
import { error, success } from '../../logger';

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

// 加载插件
var plugins = [
    './signin',
    './help',
    './me',
    './admin/admin',
    './afk',
    './backpack/backpack',
    './other',
];
plugins.forEach((pluginPath) => {
    import(pluginPath)
        .then(() => {
            success(`插件 ${pluginPath} 加载完成`);
        })
        .catch((err) => {
            error('插件加载出错,错误信息:');
            console.error(err);
        });
});
