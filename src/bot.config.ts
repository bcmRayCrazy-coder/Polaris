export interface BotConfig {
    /**
     * 机器人QQ号
     */
    account: number;

    /**
     * 可用的群id
     */
    validGroup: number[];
}

const config: BotConfig = {
    account: 257139787,
    validGroup: [799512425, 134179324],
};

export default config;
