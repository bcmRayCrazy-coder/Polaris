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
    vip: number;

    /**
     * 是否是管理员
     * 0:不是
     * 1:是
     */
    admin: number;
}
