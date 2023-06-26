const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const cron = require('node-cron');
const BookService = require('./services/book.service');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

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
