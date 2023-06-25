require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const HOST = config.host;
const DATABASE = config.database;
const USERNAME = config.username;
const PASSWORD = config.password;

module.exports = {
  flywayArgs: {
    url: `jdbc:postgresql://${HOST}/${DATABASE}`,
    locations: `filesystem:flyway_db_migrations`,
    user: USERNAME,
    password: PASSWORD,
    table: 'flyway_migration_history',
    sqlMigrationSuffixes: '.pgsql',
    baselineOnMigrate: true,
  },
  downloads: {
    expirationTimeInMs: -1,
  },
};
