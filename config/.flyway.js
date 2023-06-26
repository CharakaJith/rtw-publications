require('dotenv').config();

const HOST = process.env.PG_HOST;
const DATABASE = process.env.PG_DATABASE;
const USERNAME = process.env.PG_USER;
const PASSWORD = process.env.PG_PASSWORD;

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
