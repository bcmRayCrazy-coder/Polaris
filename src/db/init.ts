import { info, warning } from '../logger';
import { Knex } from 'knex';
import { connection } from './connect';
import { Tables } from './tables';

async function initTable(
    name: string,
    createFunction: (tableBuilder: Knex.CreateTableBuilder) => void
) {
    if (await connection.schema.hasTable(name)) {
        info(`数据库 [${name}] 已存在, 将不会再创建!`);
    } else {
        warning(`数据库 [${name}] 不存在, 正在初始化`);
        await connection.schema.createTable(name, createFunction);
    }
}

export default async function () {
    // 初始化数据库
    await initTable(Tables.Users, (builder) => {
        builder.integer('id');
        builder.string('name');
        builder.integer('coin').defaultTo(0);
        builder.integer('level').defaultTo(0);
        builder.integer('exp').defaultTo(0);
        builder.integer('vip').defaultTo(0);
        builder.boolean('admin').defaultTo(false);
    });
    await initTable(Tables.Signin, (builder) => {
        builder.integer('id');
        builder.integer('year');
        builder.integer('month');
        builder.integer('day');
    });
    info('初始化数据库完成');
}
