import { Knex } from 'knex';
import path from 'path';

const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve('./db/polaris.sqlite3'),
    },
    pool: {
        min: 0,
        max: 7,
    },
    useNullAsDefault: true,
};

export default config;
