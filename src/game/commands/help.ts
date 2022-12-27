import { client } from '../bot';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

class HelpCommand extends Command {
    constructor() {
        super('', '帮助文档');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        client.sendGroupMsg(
            executor.groupId,
            `帮助文档
#       - 显示帮助
#签到   - 每日签到
#我     - 查看个人信息`
        );
        return true;
    }
}

commandManager.register(new HelpCommand());
