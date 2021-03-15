const express = require('express');

const customersFavoriteProductsRouter = require('./customers-favorite-products');
const customersService = require('../../infrastructure/factories/customersServiceFactory');
const customerDataValidator = require('../middlewares/customerDataValidator');
const customerIdValidator = require('../middlewares/customerIdValidator');
const CustomerEntity = require('../../domain/CustomerEntity');

const router = express.Router();

router.use('/:customerId/favorite-products', customersFavoriteProductsRouter);

router.post('/', customerDataValidator, (req, res, next) => {
  const customerEntity = new CustomerEntity(
    null,
    req.body.name,
    req.body.email,
  );

  customersService
    .createCustomer(customerEntity)
    .then((customerId) => {
      res.status(201).json({ customerId });
    })
    .then(next)
    .catch(next);
});

router.put(
  '/:customerId',
  customerIdValidator,
  customerDataValidator,
  (req, res, next) => {
    const customerEntity = new CustomerEntity(
      req.params.customerId,
      req.body.name,
      req.body.email,
    );

    customersService
      .updateCustomer(customerEntity)
      .then(() => {
        res.status(204).json();
      })
      .then(next)
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
    .then(next)
    .catch(next);
});

router.delete('/:customerId', customerIdValidator, (req, res, next) => {
  const { customerId } = req.params;

  customersService
    .deleteCustomer(customerId)
    .then(() => {
      res.status(204).json();
    })
    .then(next)
    .catch(next);
});

module.exports = router;
