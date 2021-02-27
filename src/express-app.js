const express = require('express');
const { requestLogger, errorHandler } = require('./application/middlewares');
const customers = require('./application/routers/customers');

const app = express();

app.use(express.json());
app.use('/customers', customers);
app.use(errorHandler);
app.use(requestLogger);

module.exports = app;
