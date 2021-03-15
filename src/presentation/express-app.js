const express = require('express');
const expressJwt = require('express-jwt');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const errorLogger = require('./middlewares/errorLogger');
const notFoundHandler = require('./middlewares/notFoundHandler');
const routers = require('./routers');
const {
  JWT_SECRET,
  JWT_AUDIENCE,
  JWT_ISSUER,
} = require('../infrastructure/environment');

const app = express();

app.use(express.json());
app.use(
  expressJwt({
    secret: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    algorithms: ['HS256'],
  }),
);
app.use('/', routers);
app.use(errorLogger);
app.use(errorHandler);
app.use(notFoundHandler);
app.use(requestLogger);

module.exports = app;
