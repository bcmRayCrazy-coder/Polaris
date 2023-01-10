import { Command, CommandExecutor } from '../Command';
import { locationCommandManager } from './locations';

class ViewLocationCommand extends Command {
    constructor() {
        super('查看', '查看地图');
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        return true;
    }
}

locationCommandManager.register(new ViewLocationCommand());
