export interface CommandExecutor {
    /**
     * 执行者QQ号
     */
    id: number;

    /**
     * 执行者名称
     */
    name: string;

    /**
     * 执行所在的群聊
     */
    groupId: number;
}

export class Command {
    /**
     * 指令名称
     */
    name: string;

    /**
     * 指令描述
     */
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    execute(args: string[], executor: CommandExecutor): boolean {
        return false;
    }

    help(): string {
        return '';
    }
}

export class CommandManager {
    commands: Record<string, Command>;
    constructor() {
        this.commands = {};
    }

    register(command: Command) {
        this.commands[command.name] = command;
    }

    execute(name: string, args: string[], executor: CommandExecutor) {
        if (name in this.commands) {
            var suc = this.commands[name].execute(args, executor);
            this.onCommandBack(name, args, suc, executor);
        } else {
            this.onCommandNotFound(name, args, executor);
        }
    }

    onCommandNotFound(
        name: string,
        args: string[],
        executor: CommandExecutor
    ) {}
    onCommandBack(
        name: string,
        args: string[],
        success: boolean,
        executor: CommandExecutor
    ) {}
}
