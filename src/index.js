require('dotenv').config();
const expressApp = require('./presentation/express-app');
const { APP_PORT } = require('./infrastructure/environment');
const logger = require('./infrastructure/logger');

expressApp.listen(APP_PORT, () => {
  logger.info(`API listening at http://localhost:${APP_PORT}`);
});
