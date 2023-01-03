import { Command, CommandExecutor } from '../Command';
import botConfig from '../../../bot.config';
import { ItemTable } from '../../../db/types/ItemTable';
import { getUserItems } from '../../../db/controller/ItemController';
import { getPage, table2item } from '../../lib';
import { Item } from '../../items/Item';
import { client } from '../../bot';
import { segment } from 'oicq';

class ViewBackpackCommand extends Command {
    constructor() {
        super('查看', '查看背包物品');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length > 1) return false;

        var items: Item[] = (await getUserItems(executor.id)).map((v) =>
            table2item(v)
        );
        var page = 1;
        if (args.length == 1) {
            page = parseInt(args[0]);
            if (isNaN(page)) return false;
            if (Math.ceil(items.length / botConfig.itemsPerPage) <= page) {
                // 不存在的页面
                client.sendGroupMsg(executor.groupId, '查看失败: 页面不存在!');
                return true;
            }
        }
        var pageItem = getPage(page, items);

        var txt = segment.at(executor.id) + '的物品列表';
        pageItem.forEach((v) => {
            txt += '\n';
            txt += `${v.name}`;
        });
        txt += '\n';
        txt += `第 ${page}/${Math.ceil(
            items.length / botConfig.itemsPerPage
        )} 页, 翻页请用 #背包 查看 ${page + 1}`;

        client.sendGroupMsg(executor.groupId, txt);

        return true;
    }
    help(): string {
        return `#背包 查看 [页数]
如:
查看背包物品: #背包 查看
查看背包第2页物品: #背包 查看 2`;
    }
}
