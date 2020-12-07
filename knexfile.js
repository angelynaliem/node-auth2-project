// Update with your config settings.
require("dotenv").config();

// const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: false,
    connection: {
      filename: "./database/auth2.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
