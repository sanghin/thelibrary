import { config } from 'dotenv';
import knex from 'knex';

config({ path: `${process.env.PWD}/.env` });

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    stub: 'migration.stub',
    extension: 'ts',
    tableName: 'migrations',
    directory: `${__dirname}/migrations`,
  },
});

export default db;
