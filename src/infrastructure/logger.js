const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');
const enviroment = require('./enviroment');

const logger = winston.createLogger({
  level: enviroment.LOG_LEVEL,
  defaultMeta: { application: enviroment.APP_NAME },
  format: ecsFormat(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
