// Loading manually as Knex will override the default one.
require('dotenv').config({ path: `${process.env.PWD}/.env` });

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    extension: 'mjs',
    tableName: 'migrations',
    directory: `${__dirname}/migrations`,
  },
};
