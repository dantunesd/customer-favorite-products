require('dotenv').config();
const expressApp = require('./api/express-app');
const environment = require('./infrastructure/environment');
const logger = require('./infrastructure/logger');

expressApp.listen(environment.APP_PORT, () => {
  logger.info(`API listening at http://localhost:${environment.APP_PORT}`);
});
