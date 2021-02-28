const express = require('express');

const validateSchema = require('../validators/schemaValidator');
const validateObjectId = require('../validators/objectIdValidator');
const customerPutContent = require('../schemas/customerPutContent.json');
const customersService = require('../../factories/customersServiceFactory');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    validateSchema(customerPutContent, req.body);

    await customersService.createCustomer(req.body);
  } catch (error) {
    return next(error);
  }

  res.status(201);
  res.json(req.body);

  return next();
});

router.put('/:customerId', (req, res, next) => {
  const { customerId } = req.params;

  try {
    validateObjectId(customerId, 'customerId');
    validateSchema(customerPutContent, req.body);
  } catch (error) {
    return next(error);
  }

  res.json({ customerId });

  return next();
});

router.get('/:customerId', async (req, res, next) => {
  const { customerId } = req.params;

  try {
    validateObjectId(customerId, 'customerId');

    const customer = await customersService.findCustomer(customerId);
    res.json(customer);
  } catch (error) {
    return next(error);
  }

  return next();
});

module.exports = router;
