const express = require('express');
const validateSchema = require('../schemas/schemaValidator');
const customerPutContent = require('../schemas/customerPutContent.json');

const router = express.Router();

router.put('/:customerId?', (req, res, next) => {
  const { customerId } = req.params;

  try {
    validateSchema(customerPutContent, req.body);
  } catch (error) {
    return next(error);
  }

  res.json({ body: req.body, customerId });

  return next();
});

router.get('/:customerId', (req, res, next) => {
  const { customerId } = req.params;

  res.json({ customerId });

  return next();
});

module.exports = router;
