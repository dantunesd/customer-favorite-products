const express = require('express');

const customersService = require('../../factories/customersServiceFactory');
const customerDataMiddleware = require('../middlewares/customerDataValidator');
const customerIdMiddleware = require('../middlewares/customerIDValidator');

const router = express.Router();

router.post('/', customerDataMiddleware, async (req, res, next) => {
  try {
    const customerId = await customersService.createCustomer(req.body);

    res.status(201);
    res.json({ customerId });
  } catch (error) {
    return next(error);
  }

  return next();
});

router.put(
  '/:customerId',
  customerIdMiddleware,
  customerDataMiddleware,
  async (req, res, next) => {
    const { customerId } = req.params;

    try {
      await customersService.updateCustomer(customerId, req.body);

      res.json();
    } catch (error) {
      return next(error);
    }

    return next();
  },
);

router.get('/:customerId', customerIdMiddleware, async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const customer = await customersService.findCustomer(customerId);

    res.json(customer);
  } catch (error) {
    return next(error);
  }

  return next();
});

router.delete('/:customerId', customerIdMiddleware, async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const customer = await customersService.deleteCustomer(customerId);

    res.json(customer);
  } catch (error) {
    return next(error);
  }

  return next();
});

module.exports = router;
