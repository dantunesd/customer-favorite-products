const { PRODUCTS_API_URL } = require('../infrastructure/environment');
const mongoClient = require('./mongoClientFactory');
const FavoriteProductsService = require('../services/FavoriteProductsService');
const FavoriteProductsRepository = require('../repositories/FavoriteProductsRepository');
const ProductsRepository = require('../repositories/ProductsRepository');

const favoriteProductsRepository = new FavoriteProductsRepository(mongoClient);
const productsRepository = new ProductsRepository(PRODUCTS_API_URL);
const favoriteProductsService = new FavoriteProductsService(
  favoriteProductsRepository,
  productsRepository,
);

module.exports = favoriteProductsService;
