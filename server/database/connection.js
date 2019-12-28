import knex from 'knex';
import config from './knexfile';

let knexInstance;

if (!knexInstance) {
  knexInstance = knex(config);
}

export default knexInstance;
