const logger = require('../infrastructure/logger');

function requestLogger(req, res, next) {
  logger.info('logging request', {
    url: { path: req.path },
    http: {
      request: {
        method: req.method,
        body: { content: JSON.stringify(req.body) },
      },
    },
  });
  next();
}

module.exports = requestLogger;
