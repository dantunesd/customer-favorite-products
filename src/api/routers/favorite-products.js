const express = require('express');

// const customersService = require('../../factories/customersServiceFactory');
const productDataValidator = require('../middlewares/productDataValidator');
const customerIdValidator = require('../middlewares/customerIdValidator');

const router = express.Router({ mergeParams: true });

router.post('/', customerIdValidator, productDataValidator, (req, res) => {
  const { customerId } = req.params;

  res.json({ customerId, body: req.body });
});

module.exports = router;
