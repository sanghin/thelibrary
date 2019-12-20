# Siosa

Path Of Exile build library!

## Requirement

- Docker
- [nvm](https://github.com/nvm-sh/nvm)

## Install

- Install required version of node (check engines in package.json) ( e.g `nvm isntall 16` or `nvm use 16` )
- Install deps with `yarn install`
- Start the database: `docker-compose up --build`
- Migrate database: `yarn knex --knexfile server/database/knexfile.js migrate:latest`
- Start the project: `yarn dev` or `yarn build && yarn start`

## FAQ

`Why PG and not MongoDB ?`

To test PG performance when dealing with JSON objects