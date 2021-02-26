require('dotenv').config();

const express = require('express');
const enviroment = require('./infrastructure/enviroment');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(enviroment.APP_PORT, () => {
  console.log(`API listening at http://localhost:${enviroment.APP_PORT}`);
});
