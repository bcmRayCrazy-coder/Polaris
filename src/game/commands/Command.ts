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

    async beforeExecute(
        args: string[],
        executor: CommandExecutor
    ): Promise<boolean> {
        return true;
    }

    async execute(args: string[], executor: CommandExecutor): Promise<boolean> {
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

    async execute(name: string, args: string[], executor: CommandExecutor) {
        if (name in this.commands) {
            var cmd = this.commands[name];
            var suc = await cmd.beforeExecute(args, executor);
            if (!suc) return;
            suc = await cmd.execute(args, executor);
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
