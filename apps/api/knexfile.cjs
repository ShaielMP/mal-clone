require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'shai',
      password: process.env.DB_PASSWORD || 'mal_shai',
      database: process.env.DB_NAME || 'mal_clone_db',
      charset: 'utf8mb4'
    },
    migrations: {
      directory: './src/data-access/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/data-access/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/data-access/migrations',
      tableName: 'knex_migrations'
    }
  }
};
