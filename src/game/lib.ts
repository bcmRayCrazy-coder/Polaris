import { UsersTable } from '../db/types/UserTable';
import { levelName, levelUpExp, vipName } from './data';
import botConfig from '../bot.config';
import { ItemTable } from '../db/types/ItemTable';
import { Item } from './items/Item';
import { warning } from '../logger';
import Jimp from 'jimp';
import path from 'path';

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
称号: ${tag2text(
        levelName[info.level],
        info.vip != 0 ? vipName[info.vip] : undefined,
        info.admin ? '管理员' : undefined
    )}`;
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

export async function createTextImage(content: string): Promise<string> {
    function createImage(
        width: number,
        height: number,
        color: number
    ): Promise<Jimp> {
        return new Promise((res, rej) => {
            new Jimp(width, height, (err, img) => {
                if (err) rej(err);
                img.background(color, (err, img) => {
                    if (err) rej(err);
                    res(img);
                });
            });
        });
    }

    // 使用字体显示
    var font = await Jimp.loadFont(path.resolve('./src/font/polaris_ping.fnt'));
    console.log(font.info);
    var texts = content.split('\n');

    // 图片大小
    var width = 0;
    var height = 0;

    for (let i = 0; i < texts.length; i++) {
        const t = texts[i];
        // 字体大小
        var fontWidth = Jimp.measureText(font, t);
        var fontHeight = Jimp.measureTextHeight(font, t, fontWidth);

        if (width < fontWidth) width = fontWidth;
        height += fontHeight;
    }

    // 生成图片
    var img = await createImage(width + 10, height + 10, 0xffffff);

    // 当前写入文字的y
    var currentHeight = 0;

    for (let i = 0; i < texts.length; i++) {
        const t = texts[i];
        img.print(font, 0, currentHeight, t);
        currentHeight += Jimp.measureTextHeight(
            font,
            t,
            Jimp.measureText(font, t)
        );
    }

    return await img.getBase64Async(Jimp.MIME_PNG);
}
