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

    /**
     * 每页展示的项目数量
     */
    itemsPerPage: number;
}

const config: BotConfig = {
    account: 257139787,
    validGroup: [678422707, 134179324, 476581286],
    adminId: [975875040, 2979893134, /**测试用户管理员 */ 114514],
    itemsPerPage: 10,
};

export default config;
