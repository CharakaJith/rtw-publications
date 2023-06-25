const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const cron = require('node-cron');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const BookService = require('./services/book.service');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the databse
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: process.env.PG_HOST,
  dialect: config.dialect,
  pool: {
    max: parseInt(process.env.PG_MAXCONN),
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});
sequelize
  .authenticate()
  .then(async () => {
    console.log(chalk.white.bgCyan.bold(`Connection has been established successfully.`));
  })
  .catch((error) => {
    console.log(chalk.white.bgRedBright.bold(` Unable to connect to the database: ${error.message} `));
    process.exit();
  });

// import routing files
const author = require('./routes/author.routes');
const book = require('./routes/book.routes');

// set up routing paths
app.use('/api/author', author);
app.use('/api/book', book);

// generate log report by every 5 minute
cron.schedule('0 */5 * * * *', () => {
  BookService.generatePerformanceReport();
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.white.bgGreen.bold(' PORT ') + chalk.white.bgBlue.bold(` ${PORT} `) + chalk.white.bgGreen.bold(' MODE ') + chalk.white.bgBlue.bold(` ${process.env.NODE_ENV} `));
});
