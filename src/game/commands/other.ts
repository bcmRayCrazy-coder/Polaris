import { segment } from 'oicq';
import { client } from '../bot';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

class PictureCommand extends Command {
    constructor() {
        super('图片', '');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if(args.length != 1)return false;
        client.sendGroupMsg(executor.groupId,[
            '来自 ',
            segment.at(executor.id,executor.name),
            ' 的图片:',
            segment.image(args[0])
        ])
        return true;
    }
    help(): string {
        return '发送图片: #图片 <网址或图片base64>';
    }
}

commandManager.register(new PictureCommand());
