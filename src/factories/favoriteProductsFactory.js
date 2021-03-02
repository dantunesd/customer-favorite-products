const mongoClient = require('./mongoClientFactory');
const FavoriteProductsService = require('../services/FavoriteProductsService');
const FavoriteProductsRepository = require('../repositories/FavoriteProductsRepository');

const favoriteProductsRepository = new FavoriteProductsRepository(mongoClient);
const favoriteProductsService = new FavoriteProductsService(
  favoriteProductsRepository,
);

module.exports = favoriteProductsService;
