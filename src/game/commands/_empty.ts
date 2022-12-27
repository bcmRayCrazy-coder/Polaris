import { Command, CommandExecutor } from "./Command";
import { commandManager } from "./CommandManager";

class MyCommand extends Command {
    constructor(){
        super("","")
    }
    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
        return true;
    }
    help(): string {
        return "";
    }
}

commandManager.register(new MyCommand());