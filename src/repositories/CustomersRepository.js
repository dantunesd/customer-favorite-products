const { ObjectID } = require('mongodb');
const { upsertErrorHandler, notFoundHandler } = require('./helpers');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class CustomersRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db(dbName).collection(collectionName);
  }

  async create(customerData) {
    return this.collection
      .insertOne(customerData)
      .then((result) => result.insertedId)
      .catch(upsertErrorHandler);
  }

  async getById(customerId) {
    const filter = { _id: ObjectID(customerId) };
    const projection = { _id: true, name: true, email: true };

    return this.collection.findOne(filter, projection).then((result) => {
      notFoundHandler(result, 'Customer');
      return result;
    });
  }

  async deleteById(customerId) {
    const filter = { _id: ObjectID(customerId) };

    return this.collection.deleteOne(filter).then((result) => {
      notFoundHandler(result.result.n, 'Customer');
    });
  }

  async updateById(customerId, customerData) {
    const filter = { _id: ObjectID(customerId) };
    const fields = { $set: customerData };

    return this.collection
      .updateOne(filter, fields)
      .then((result) => {
        notFoundHandler(result.result.n, 'Customer');
      })
      .catch(upsertErrorHandler);
  }
}

module.exports = CustomersRepository;
