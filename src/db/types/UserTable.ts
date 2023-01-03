export interface UsersTable {
    /**
     * QQ号
     */
    id: number;

    /**
     * 昵称
     */
    name: string;

    /**
     * 健康值
     */
    health: number;

    /**
     * 硬币
     */
    coin: number;

    /**
     * 等级
     */
    level: number;

    /**
     * 经验
     */
    exp: number;

    /**
     * VIP等级
     * 0:非VIP  ( x = 0 )
     * 1:普通VIP    ( x < 40 )
     * 2:高级VIP    ( 40 <= x <= 100)
     * 3:尊贵VIP    ( x < 100 )
     */
    vip: 0 | 1 | 2 | 3;

    /**
     * 是否是管理员
     */
    admin: boolean;
}
