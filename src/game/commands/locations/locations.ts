import { success } from '../../../logger';
import { client } from '../../bot';
import { Command, CommandExecutor, CommandManager } from '../Command';
import { commandManager } from '../CommandManager';

export let locationCommandManager = new CommandManager();

locationCommandManager.onCommandNotFound = function (
    name: string,
    args: string[],
    executor: CommandExecutor
) {
    client.sendGroupMsg(
        executor.groupId,
        `
指令 #地图 ${name} 不存在! 输入 #地图 帮助 查看管理指令帮助`
    );
};

class LocationCommand extends Command {
    constructor() {
        super('地图', 'Polaris地图');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length < 1) return false;
        var cmd = args.slice(1);

        await locationCommandManager.execute(args[0], cmd, executor);

        return true;
    }
    help(): string {
        return `地图使用手册
查看地图: #地图 查看
前往位置: #地图 前往 <位置>
我在哪里: #地图 我`;
    }
}

commandManager.register(new LocationCommand());

success('地图 子插件初始化完成')