# Siosa

## Requirement

- Docker

## Install

```
docker-compose build
docker-compose run --rm node yarn install
docker-compose up -d
```

## Migrations

```
docker-compose run --rm node yarn knex migrate:latest
```
