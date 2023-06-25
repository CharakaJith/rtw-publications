// index.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return ` ${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),

  transports: [
    new transports.File({
      filename: 'logs/logger.log',
      level: 'info',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxFiles: '30d',
    }),
  ],
});

const reportLogger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),

  transports: [
    new transports.File({
      filename: 'logs/report.log',
      level: 'info',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxFiles: '30d',
    }),
  ],
});

module.exports = {
  logger,
  reportLogger,
};
