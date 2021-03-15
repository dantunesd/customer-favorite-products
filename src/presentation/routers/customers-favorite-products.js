const express = require('express');

const favoriteProductsService = require('../../infrastructure/factories/favoriteProductsServiceFactory');
const productDataValidator = require('../middlewares/productDataValidator');
const customerIdValidator = require('../middlewares/customerIdValidator');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  customerIdValidator,
  productDataValidator,
  (req, res, next) => {
    const { customerId } = req.params;
    const { productId } = req.body;

    favoriteProductsService
      .addFavoriteProduct(customerId, productId)
      .then(() => {
        res.status(204).json();
      })
      .then(next)
      .catch(next);
  },
);

router.get('/', customerIdValidator, (req, res, next) => {
  const { customerId } = req.params;

  favoriteProductsService
    .getFavoriteProducts(customerId)
    .then((favoriteProducts) => {
      res.json(favoriteProducts);
    })
    .then(next)
    .catch(next);
});

router.delete('/:productId', customerIdValidator, (req, res, next) => {
  const { customerId, productId } = req.params;

  favoriteProductsService
    .deleteFavoriteProduct(customerId, productId)
    .then(() => {
      res.status(204).json();
    })
    .then(next)
    .catch(next);
});

module.exports = router;
