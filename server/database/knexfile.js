require('dotenv').config({
  path: `${__dirname}/../../.env.local`
})

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    stub: 'migration.stub',
    directory: `${__dirname}/migrations`,
  },
}
