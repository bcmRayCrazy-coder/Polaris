import { UsersTable } from '../db/types/UserTable';
import { levelUpExp, vipName } from './data';

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
