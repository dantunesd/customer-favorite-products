const express = require('express');

const customersService = require('../../factories/customersServiceFactory');
const customerDataMiddleware = require('../middlewares/customerDataValidator');
const customerIdMiddleware = require('../middlewares/customerIDValidator');

const router = express.Router();

router.post('/', customerDataMiddleware, async (req, res, next) => {
  customersService
    .createCustomer(req.body)
    .then((customerId) => {
      res.status(201);
      res.json({ customerId });
    })
    .catch(next);
});

router.put(
  '/:customerId',
  customerIdMiddleware,
  customerDataMiddleware,
  async (req, res, next) => {
    const { customerId } = req.params;

    customersService
      .updateCustomer(customerId, req.body)
      .then(() => {
        res.json();
      })
      .catch(next);
  },
);

router.get('/:customerId', customerIdMiddleware, async (req, res, next) => {
  const { customerId } = req.params;

  customersService
    .getCustomer(customerId)
    .then((customer) => {
      res.json(customer);
    })
    .catch(next);
});

router.delete('/:customerId', customerIdMiddleware, async (req, res, next) => {
  const { customerId } = req.params;

  customersService
    .deleteCustomer(customerId)
    .then((customer) => {
      res.json(customer);
    })
    .catch(next);
});

module.exports = router;
