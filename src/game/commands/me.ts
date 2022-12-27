import { getUserInfo } from '../../db/controller/UserController';
import { client } from '../bot';
import { info2text } from '../lib';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

class MeCommand extends Command {
    constructor() {
        super('我', '查看个人信息');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        client.sendGroupMsg(
            executor.groupId,
            executor.name +
                ' 的个人信息:\n' +
                info2text(await getUserInfo(executor.id))
        );
        return true;
    }
    help(): string {
        return '#我 查看我的个人信息';
    }
}

commandManager.register(new MeCommand());
