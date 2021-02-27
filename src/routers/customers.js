const express = require('express');
const validateSchema = require('../infrastructure/schemaValidator');
const customerPutContent = require('../schemas/customerPutContent.json');

const router = express.Router();

router.put('/:customerId?', (req, res, next) => {
  try {
    validateSchema(customerPutContent, req.body);
  } catch (error) {
    return next(error);
  }

  res.json({ message: req.body });

  return next();
});

router.get('/:customerId', (req, res) => {
  res.json({ message: 'hello word' });
});

module.exports = router;
