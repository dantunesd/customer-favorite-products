require('dotenv').config();
const express = require('express');
const { environment, logger } = require('./infrastructure');
const customers = require('./routers/customers');
const requestLogger = require('./middlewares/requestLogger');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/customers', customers);

app.listen(environment.APP_PORT, () => {
  logger.info(`API listening at http://localhost:${environment.APP_PORT}`);
});
