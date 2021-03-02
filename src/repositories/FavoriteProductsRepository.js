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

  async getByCustomerId(customerId) {
    const filter = { _id: ObjectID(customerId) };
    const projection = { projection: { _id: 0, favoriteProducts: 1 } };

    return this.collection.findOne(filter, projection).then((result) => {
      notFoundHandler(result, 'Customer');
      return result;
    });
  }

  async deleteByCustomerIdAndProductId(customerId, productId) {
    const filter = { _id: ObjectID(customerId) };
    const pull = { $pull: { favoriteProducts: { productId } } };

    return this.collection.updateOne(filter, pull).then((result) => {
      notFoundHandler(result.result.n, 'Customer');
      notFoundHandler(result.result.nModified, 'ProductId');
    });
  }
}

module.exports = FavoriteProductsRepository;
