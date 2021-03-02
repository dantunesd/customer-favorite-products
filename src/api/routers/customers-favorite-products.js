const express = require('express');

const favoriteProductsService = require('../../factories/favoriteProductsFactory');
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
        res.json({ customerId });
      })
      .catch(next);
  },
);

module.exports = router;
