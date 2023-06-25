const loggerIndex = require('./index');

const report = (data) => {
  const logMessage = JSON.stringify(data).split('\n');

  loggerIndex.reportLogger.info(logMessage);
};

module.exports = report;
