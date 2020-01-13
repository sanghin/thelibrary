const { config } = require('dotenv');
config({ path: `${process.env.PWD}/.env` });

module.exports = {
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
        tableName: 'migrations',
        directory: `${__dirname}/migrations`,
    },
};
