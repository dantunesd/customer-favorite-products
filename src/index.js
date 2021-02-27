require('dotenv').config();
const { environment, logger } = require('./infrastructure');
const expressApp = require('./application/express-app');

expressApp.listen(environment.APP_PORT, () => {
  logger.info(`API listening at http://localhost:${environment.APP_PORT}`);
});
