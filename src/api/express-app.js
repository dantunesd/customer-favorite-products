const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const errorLogger = require('./middlewares/errorLogger');
const routers = require('./routers');

const app = express();

app.use(express.json());
app.use('/', routers);
app.use(errorLogger);
app.use(errorHandler);
app.use(requestLogger);

module.exports = app;
