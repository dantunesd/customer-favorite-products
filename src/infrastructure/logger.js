const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const enviroment = require('./environment');

const logger = winston.createLogger({
  level: enviroment.LOG_LEVEL,
  defaultMeta: { application: enviroment.APP_NAME },
  format: ecsFormat({ convertReqRes: true }),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
