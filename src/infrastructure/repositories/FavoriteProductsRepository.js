const { ObjectID } = require('mongodb');
const { productDuplicatedHandler, notFoundHandler } = require('./helpers');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class FavoriteProductsRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db(dbName).collection(collectionName);
  }

  async addByCustomerId(customerId, productEntity) {
    const filter = { _id: ObjectID(customerId) };
    const addToSet = { $addToSet: { favoriteProducts: productEntity } };

    return this.collection.updateOne(filter, addToSet).then((res) => {
      const { result } = res;
      notFoundHandler(result.n, 'Customer');
      productDuplicatedHandler(result.n, result.nModified);
    });
  }

  async getByCustomerId(customerId) {
    const filter = { _id: ObjectID(customerId) };
    const projection = { projection: { _id: 0, favoriteProducts: 1 } };

    return this.collection
      .findOne(filter, projection)
      .then((result) => {
        notFoundHandler(result, 'Customer');
        return result;
      })
      .then((result) => {
        if (Object.keys(result).length !== 0) {
          return result;
        }
        return { favoriteProducts: [] };
      });
  }

  async deleteByCustomerIdAndProductId(customerId, productId) {
    const filter = { _id: ObjectID(customerId) };
    const pull = { $pull: { favoriteProducts: { id: productId } } };

    return this.collection.updateOne(filter, pull).then((result) => {
      notFoundHandler(result.result.n, 'Customer');
      notFoundHandler(result.result.nModified, 'ProductId');
    });
  }
}

module.exports = FavoriteProductsRepository;
