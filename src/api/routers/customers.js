const express = require('express');

const customersFavoriteProductsRouter = require('./customers-favorite-products');
const customersService = require('../../factories/customersServiceFactory');
const customerDataValidator = require('../middlewares/customerDataValidator');
const customerIdValidator = require('../middlewares/customerIdValidator');

const router = express.Router();

router.use('/:customerId/favorite-products', customersFavoriteProductsRouter);

router.post('/', customerDataValidator, (req, res, next) => {
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
  customerIdValidator,
  customerDataValidator,
  (req, res, next) => {
    const { customerId } = req.params;

    customersService
      .updateCustomer(customerId, req.body)
      .then(() => {
        res.status(204);
        res.json();
      })
      .catch(next);
  },
);

router.get('/:customerId', customerIdValidator, (req, res, next) => {
  const { customerId } = req.params;

  customersService
    .getCustomer(customerId)
    .then((customer) => {
      res.json(customer);
    })
    .catch(next);
});

router.delete('/:customerId', customerIdValidator, (req, res, next) => {
  const { customerId } = req.params;

  customersService
    .deleteCustomer(customerId)
    .then(() => {
      res.status(204);
      res.json();
    })
    .catch(next);
});

module.exports = router;
