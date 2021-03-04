const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const { NODE_ENV, LOG_LEVEL, APP_NAME } = require('./environment');

const logger = winston.createLogger({
  silent: NODE_ENV === 'test',
  level: LOG_LEVEL,
  defaultMeta: { application: APP_NAME },
  format: ecsFormat({ convertReqRes: true }),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
