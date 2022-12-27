import { client } from "../../bot";
import { Command, CommandExecutor, CommandManager } from "../Command";
import { commandManager } from "../CommandManager";

export let adminCommandManager = new CommandManager();

adminCommandManager.onCommandNotFound = function(name: string, args: string[], executor: CommandExecutor){
    client.sendGroupMsg(executor.groupId,``)
}

class AdminCommand extends Command {
    constructor(){
        super("管理","管理员使用, 用于管理机器人")
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        if(args.length < 1) return false;
        var cmd = args.slice(1);
        await adminCommandManager.execute(args[0],cmd,executor);
        return true;
    }
    help(): string {
        return "";
    }
}

commandManager.register(new AdminCommand());

import './user';