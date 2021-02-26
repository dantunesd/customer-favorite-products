require('dotenv').config();

const express = require('express');
const enviroment = require('./infrastructure/enviroment');
const customers = require('./routers/customers');

const app = express();

app.use('/customers', customers);

app.listen(enviroment.APP_PORT, () => {
  console.log(`API listening at http://localhost:${enviroment.APP_PORT}`);
});
