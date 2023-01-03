import { UsersTable } from '../db/types/UserTable';
import { levelUpExp, vipName } from './data';
import botConfig from '../bot.config';
import { ItemTable } from '../db/types/ItemTable';
import { Item } from './items/Item';
import { warning } from '../logger';

/**
 * 将多个标签转为标签文字
 * @param tags 标签
 * @returns 文字
 */
export function tag2text(...tags: (string | undefined)[]): string {
    return tags.map((v) => (v ? `[${v}]` : undefined)).join('');
}

/**
 * 将用户表转换为可读的描述文字
 * @param info 用户表
 * @returns 用户描述文字
 */
export function info2text(info: UsersTable) {
    return `id: ${info.id}
名称: ${info.name}
硬币: ${info.coin}
经验: ${info.exp} / ${levelUpExp[info.level]}
等级: ${info.level}
称号: ${tag2text(vipName[info.vip], info.admin ? '管理员' : undefined)}`;
}

/**
 * 将text连接为id
 * @param text 文字
 * @returns 连接结果
 */
export function connect2id(...text: string[]): string {
    return text.join('.');
}

/**
 * 获取随机hash
 * @returns hash
 */
export function getHash(): string {
    return (
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
    );
}

/**
 * 获取一页的项目
 * @param page 页数
 * @param items 所有项目
 * @param pageLength 页面长度
 * @returns 目标页面的项目
 */
export function getPage<T>(
    page: number,
    items: T[],
    pageLength: number = botConfig.itemsPerPage
): T[] {
    return items.slice((page - 1) * pageLength, page * pageLength);
}

/**
 * 将item表转换为Item类
 * @param table 数据库表数据
 */
export function table2item(table: ItemTable): Item {
    if (!table.metadata.type) warning('物品metadata不存在, 将使用空数据');
    var item = new Item(
        table.id,
        table.name,
        table.metadata.type || '',
        table.metadata
    );
    return item;
}
