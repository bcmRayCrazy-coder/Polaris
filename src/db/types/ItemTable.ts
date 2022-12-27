export interface ItemTable {
    /**
     * 物品hash
     */
    hash: string;

    /**
     * 拥有者QQ号
     */
    owner: number;

    /**
     * 物品id
     */
    id: string;

    /**
     * 物品名称
     */
    name: string;

    /**
     * 物品附加数据
     */
    metadata: Object;
}
