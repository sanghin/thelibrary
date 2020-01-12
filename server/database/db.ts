import Knex from 'knex';
import { config } from 'dotenv';

config({ path: `${process.env.PWD}/.env` });

export const dbConfig = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    // This is missing from the TypeScript types currently.
    stub: 'migration.stub',
    extension: 'ts',
    tableName: 'migrations',
    directory: `${__dirname}/migrations`,
  },
};

const db: Knex = Knex(dbConfig as Knex.Config);

export default db;
