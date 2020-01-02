import knex from 'knex';
import config from './db';

let knexInstance;

if (!knexInstance) {
  knexInstance = knex(config);
}

export default knexInstance;
