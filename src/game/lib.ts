import { UsersTable } from '../db/types/UserTable';
import { levelUpExp, vipName } from './data';
import botConfig from '../bot.config';

export function tag2text(...tags: (string | undefined)[]): string {
    return tags.map((v) => (v ? `[${v}]` : undefined)).join('');
}

export function info2text(info: UsersTable) {
    return `id: ${info.id}
名称: ${info.name}
硬币: ${info.coin}
经验: ${info.exp} / ${levelUpExp[info.level]}
等级: ${info.level}
称号: ${tag2text(vipName[info.vip], info.admin ? '管理员' : undefined)}`;
}

export function connect2id(...text: string[]): string {
    return text.join('.');
}

export function getHash(): string {
    return (
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
    );
}

export function getPage<T>(
    page: number,
    items: T[],
    pageLength: number = botConfig.itemsPerPage
): T[] {
    return items.slice((page - 1) * pageLength, page * pageLength);
}
