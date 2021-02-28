const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const errorLogger = require('./middlewares/errorLogger');
const customers = require('./routers/customers');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/customers', customers);
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
