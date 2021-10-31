require('dotenv').config({
  path: `${__dirname}/../../.env.local`
})

const knex = require('knex')({
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
    tableName: 'knex_migrations',
    directory: `${__dirname}/migrations`,
  },
})

module.exports = knex
