require("dotenv").config();

module.exports = {
  client: "pg",
  // connection: process.env.POSTGRES_DATABASE_URL,
  connection: "postgresql://postgres@localhost:5432/siosa",
  migrations: {
    extension: "mjs",
    tableName: "migrations",
    directory: "./migrations"
  }
};
