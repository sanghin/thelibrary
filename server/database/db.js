const { config } = require('dotenv');
const Knex = require('knex');

config({ path: `${process.env.PWD}/.env` });

const knexConfig = {
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

const db = Knex(knexConfig);
module.exports = db;
