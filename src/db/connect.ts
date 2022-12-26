import knex from 'knex';
import config from './config';

export let connection = knex(config);
