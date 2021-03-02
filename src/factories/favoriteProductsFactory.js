const { MongoClient } = require('mongodb');
const environment = require('../infrastructure/environment');
const FavoriteProductsService = require('../services/FavoriteProductsService');
const FavoriteProductsRepository = require('../repositories/FavoriteProductsRepository');

const mongoClient = new MongoClient(environment.CUSTOMERS_DB_URL, {
  useUnifiedTopology: true,
});
mongoClient.connect();

const favoriteProductsRepository = new FavoriteProductsRepository(mongoClient);
const favoriteProductsService = new FavoriteProductsService(
  favoriteProductsRepository,
);

module.exports = favoriteProductsService;
