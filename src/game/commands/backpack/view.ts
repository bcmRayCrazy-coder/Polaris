import { Command, CommandExecutor } from '../Command';
import botConfig from '../../../bot.config';
import { ItemTable } from '../../../db/types/ItemTable';
import { getUserItems } from '../../../db/controller/ItemController';

class ViewBackpackCommand extends Command {
    constructor() {
        super('查看', '查看背包物品');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if (args.length > 1) return false;

        var items: ItemTable[] = await getUserItems(executor.id);
        if (args.length == 1) {
            var page = parseInt(args[0]);
            if (isNaN(page)) return false;
        }
        return true;
    }
    help(): string {
        return `#背包 查看 [页数]
如:
查看背包物品: #背包 查看
查看背包第2页物品: #背包 查看 2`;
    }
}
