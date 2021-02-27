require('dotenv').config();
const express = require('express');
const { environment, logger } = require('./infrastructure');
const { requestLogger, errorHandler } = require('./application/middlewares');
const customers = require('./application/routers/customers');

const app = express();

app.use(express.json());
app.use('/customers', customers);
app.use(errorHandler);
app.use(requestLogger);

app.listen(environment.APP_PORT, () => {
  logger.info(`API listening at http://localhost:${environment.APP_PORT}`);
});
