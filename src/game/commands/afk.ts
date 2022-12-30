import {
    getAfkData,
    isAfk,
    startAfk,
    stopAfk,
} from '../../db/controller/AfkController';
import {
    getUserInfo,
    updateUserInfo,
} from '../../db/controller/UserController';
import { client } from '../bot';
import { Command, CommandExecutor } from './Command';
import { commandManager } from './CommandManager';

function getExp(minutes: number): number {
    return Math.round(minutes * 0.2);
}

class AfkCommand extends Command {
    constructor() {
        super('休息', '安静的休息, 获取经验');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length == 0) {
            if (await isAfk(executor.id)) {
                client.sendGroupMsg(
                    executor.groupId,
                    '您已经在休息了, 结束休息请输入 #休息 结束'
                );
                return true;
            }
            await startAfk(executor.id);
            var startTime = new Date();
            client.sendGroupMsg(
                executor.groupId,
                `您在 ${startTime.toLocaleString()} 开始了休息, 结束休息请输入 #休息 结束`
            );
            return true;
        } else {
            if (args[0] == '结束') {
                if (!(await isAfk(executor.id))) {
                    client.sendGroupMsg(
                        executor.groupId,
                        '您还不在休息, 开始休息请输入 #休息'
                    );
                    return true;
                }
                var data = await stopAfk(executor.id);
                var startTime = new Date(data.time);
                var passedMinutes =
                    (Date.now() - startTime.getTime()) / 1000 / 60;

                var exp = getExp(passedMinutes);

                var userInfo = await getUserInfo(executor.id);
                userInfo.exp += exp;
                await updateUserInfo(userInfo);

                client.sendGroupMsg(
                    executor.groupId,
                    `休息结束!
您本次休息了 ${passedMinutes} 分钟(从 ${startTime.toLocaleTimeString()} 开始休息)
本次休息获得 ${exp.toString()} 经验, 您目前有 ${userInfo.exp} 经验`
                );
                return true;
            } else if (args[0] == '时长') {
                if (!(await isAfk(executor.id))) {
                    client.sendGroupMsg(
                        executor.groupId,
                        '您还不在休息, 开始休息请输入 #休息'
                    );
                    return true;
                }
                var data = await getAfkData(executor.id);
                var startTime = new Date(data.time);
                var passedMinutes =
                    (Date.now() - startTime.getTime()) / 1000 / 60;
                client.sendGroupMsg(
                    executor.groupId,
                    `您已经休息了 ${Math.floor(
                        passedMinutes
                    )} 分钟(从 ${startTime.toLocaleDateString()} 开始休息), 预计获得 ${getExp(
                        passedMinutes
                    ).toString()} 经验`
                );
                return true;
            }
        }
        return false;
    }
    help(): string {
        return `开始休息:
#休息
结束休息:
#休息 结束`;
    }
}

commandManager.register(new AfkCommand());
