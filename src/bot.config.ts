export interface BotConfig {
    /**
     * 机器人QQ号
     */
    account: number;

    /**
     * 可用的群id
     */
    validGroup: number[];

    /**
     * 管理员QQ号
     */
    adminId: number[];
}

const config: BotConfig = {
    account: 257139787,
    validGroup: [678422707, 134179324],
    adminId: [975875040, 2979893134],
};

export default config;
