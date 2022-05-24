const express = require('express');
const customersRouter = require('./customers');

const router = express.Router();

router.use('/customers/', customersRouter);

module.exports = router;
