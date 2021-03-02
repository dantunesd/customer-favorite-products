const { ObjectID } = require('mongodb');
const { notUpdatedHandler, notFoundHandler } = require('./helpers');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class FavoriteProductsRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db(dbName).collection(collectionName);
  }

  async addByCustomerId(customerId, product) {
    const filter = { _id: ObjectID(customerId) };
    const addToSet = { $addToSet: { favoriteProducts: product } };

    return this.collection.updateOne(filter, addToSet).then((result) => {
      notFoundHandler(result.result.n, 'Customer');
      notUpdatedHandler(result.result.nModified, 'product');
    });
  }
}

module.exports = FavoriteProductsRepository;
