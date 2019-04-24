// Update with your config settings.

require('dotenv').config();

localPgConnection = {
  host: 'localhost',
  database: 'devdesk',
  user: "jay",
  password: 'password'
}

const prodDbConnection = process.env.DATABASE_URL || localPgConnection

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/devdesk.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: prodDbConnection, // an object or a string
    migrations: {
      directory: './data/migrations',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './data/seeds',
    },
  }


};
