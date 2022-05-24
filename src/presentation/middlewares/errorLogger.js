const logger = require('../../infrastructure/logger');

function errorLogger(error, req, res, next) {
  logger.error('logging error', {
    error: {
      message: error.message,
      type: error.constructor.name,
      code: error.code,
      stack_trace: error.stack,
    },
  });

  next(error);
}

module.exports = errorLogger;
