require('dotenv').config();
const express = require('express');
const { environment, logger } = require('./infrastructure');
const customers = require('./routers/customers');

express.json();

const app = express();

app.use('/customers', customers);

app.listen(environment.APP_PORT, () => {
  logger.info(`API listening at http://localhost:${environment.APP_PORT}`);
});
