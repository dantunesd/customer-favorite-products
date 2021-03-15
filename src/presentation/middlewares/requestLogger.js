const logger = require('../../infrastructure/logger');

function requestLogger(req, res, next) {
  logger.info('logging request and response', { req, res });
  next();
}

module.exports = requestLogger;
