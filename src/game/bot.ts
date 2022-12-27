import { createClient } from 'oicq';
import botConfig from '../bot.config';
import { addUser, getUserInfo } from '../db/controller/UserController';
import { error, info, success } from '../logger';
import { commandManager } from './commands/CommandManager';
import { info2text } from './lib';

export let client = createClient(botConfig.account);

client
    .on('system.login.qrcode', function (e) {
        process.stdin.once('data', () => {
            this.login();
        });
    })
    .login();

function waitTillLogin(): Promise<void> {
    return new Promise((res) => {
        client.on('system.online', () => {
            res();
        });
    });
}

export default async function () {
    info('等待登陆');
    await waitTillLogin();

    success('登陆成功!');
    // botConfig.validGroup.forEach(gid=>{
    //     client.sendGroupMsg(gid,"Hi");
    // })

    client.on('request.group.invite', (event) => {
        info('收到加群请求', '群名:', event.group_name);
        event.approve(true);
    });

    client.on('message.group.normal', async (event) => {
        if (!botConfig.validGroup.includes(event.group_id)) return;
        if (
            !(
                event.message[0].type == 'text' &&
                event.message[0].text.indexOf('#') == 0
            )
        )
            return;
        if ((await getUserInfo(event.sender.user_id)) == undefined) {
            var userInfo = await addUser(
                event.sender.user_id,
                event.sender.nickname
            );
            event.reply(
                '您还没有Polaris账号呢, 已自动帮您创建\n您目前的账户信息:\n' +
                    info2text(userInfo)
            );
        }
        var msg = event.message[0].text;
        var cmd = msg.split(' ');
        var name = cmd[0].slice(1);
        var args = cmd.slice(1);
        commandManager.execute(name, args, {
            id: event.sender.user_id,
            name: event.sender.nickname,
            groupId: event.group_id,
        });
    });

    process.on('uncaughtException',(err,origin)=>{
        error('出现错误:',err.name);
        error(err.message);
        error('错误Stack:');
        error(err.stack || '无法解析stack');
        error('错误origin:');
        error(origin);
    })
}
