import { segment } from 'oicq';
import { error, warning } from '../../logger';
import { client } from '../bot';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

class PictureCommand extends Command {
    constructor() {
        super('图片', '发送图片');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length != 1) return false;
        if (args[0] == '网址') {
            client.sendGroupMsg(
                executor.groupId,
                '这是ray找到的一些随机图片的网址:\n' +
                    [
                        'https://api.yimian.xyz/img?type=moe',
                        'https://img.xjh.me/random_img.php',
                        'https://img.paulzzh.tech/touhou/random',
                        'https://api.yimian.xyz/img?type=moe',
                        'https://api.yimian.xyz/img?type=moe&size=1920x1080',
                        'https://api.ixiaowai.cn/mcapi/mcapi.php',
                        'https://api.ixiaowai.cn/api/api.php',
                        'https://api.r10086.com/img-api.php?type=动漫综合1',
                        'https://api.r10086.com/img-api.php?type=动漫综合18',
                        'https://api.r10086.com/img-api.php?zsy=某科学的超电磁炮',
                        'https://api.r10086.com/img-api.php?type=东方project1',
                        'https://api.r10086.com/img-api.php?zsy=原神',
                    ].join('\n')
            );
            return true;
        }
        client.sendGroupMsg(executor.groupId, [
            '来自 ',
            segment.at(executor.id, executor.name),
            ' 的图片:',
            segment.image(args[0]),
        ]);
        return true;
    }
    help(): string {
        return '发送图片: #图片 <网址或图片base64>';
    }
}

class RecordCommand extends Command {
    constructor() {
        super('语音', '发送语音');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length != 1) return false;
        client.sendGroupMsg(executor.groupId, [
            '来自 ',
            segment.at(executor.id, executor.name),
            ' 的语音:',
        ]);
        client
            .sendGroupMsg(executor.groupId, segment.record(args[0]))
            .catch((err) => {
                error('用户语音发送失败,错误信息:');
                error(err.stack || err.message);
                client.sendGroupMsg(
                    executor.groupId,
                    '语音发送失败! 错误信息: ' + err.message
                );
            });
        return true;
    }
    help(): string {
        return '发送语音: #语音 <网址或语音base64>';
    }
}

class DiceCommand extends Command {
    constructor() {
        super('骰子', '发送骰子');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length != 1) return false;
        var num = parseInt(args[0]);
        if (num > 6 || num < 1) return false;
        if (isNaN(num)) return false;
        client.sendGroupMsg(executor.groupId, [
            '来自 ',
            segment.at(executor.id, executor.name),
            ' 的骰子:',
        ]);
        client.sendGroupMsg(executor.groupId, segment.dice(num));
        return true;
    }
    help(): string {
        return '发送骰子: #骰子 <目标骰子数 1~6>';
    }
}

commandManager.register(new PictureCommand());
commandManager.register(new RecordCommand());
commandManager.register(new DiceCommand());
