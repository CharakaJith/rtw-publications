const loggerIndex = require('./index');

const logger = (logType, isSuccess, statusCode, message, req, stack) => {
  const logBody = {
    logType: logType,
    endpoint: req.originalUrl,
    request: {
      endpoint: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      method: req.method,
    },
    response: {
      success: isSuccess,
      statusCode: statusCode,
      message: {
        message,
      },
      ...(stack && {
        stack: stack,
      }),
    },
  };

  const logString = JSON.stringify(logBody).split('\n');

  if (logType === 'info') {
    loggerIndex.info(logString);
  } else if (logType === 'warn') {
    loggerIndex.warn(logString);
  } else if (logType === 'debug') {
    loggerIndex.debug(logString);
  } else {
    loggerIndex.error(logString);
  }
};

module.exports = logger;
