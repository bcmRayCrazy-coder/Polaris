import { info, warning } from '../logger';
import knex, { Knex } from 'knex';
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
        builder.integer('health').defaultTo(100);
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
    await initTable(Tables.Treasures, (builder) => {
        builder.increments('id');
        builder.integer('owner');
        builder.integer('level');
    });
    await initTable(Tables.Items, (builder) => {
        builder.string('hash');
        builder.integer('owner');
        builder.string('id');
        builder.string('name');
        builder.json('metadata');
    });
    await initTable(Tables.Afk,(builder)=>{
        builder.integer('id');
        builder.timestamp('time').defaultTo(connection.fn.now());
    })
    info('初始化数据库完成');
}
