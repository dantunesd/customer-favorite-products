const { ObjectID } = require('mongodb');
const CustomerEntity = require('../../domain/CustomerEntity');
const { upsertErrorHandler, notFoundHandler } = require('./helpers');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class CustomersRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db(dbName).collection(collectionName);
  }

  async create(customerEntity) {
    return this.collection
      .insertOne(customerEntity)
      .then((result) => result.insertedId)
      .catch(upsertErrorHandler);
  }

  async getById(customerId) {
    const filter = { _id: ObjectID(customerId) };
    const projection = { projection: { name: 1, email: 1 } };

    return this.collection.findOne(filter, projection).then((result) => {
      notFoundHandler(result, 'Customer');
      // eslint-disable-next-line no-underscore-dangle
      return new CustomerEntity(result._id, result.name, result.email);
    });
  }

  async deleteById(customerId) {
    const filter = { _id: ObjectID(customerId) };

    return this.collection.deleteOne(filter).then((result) => {
      notFoundHandler(result.result.n, 'Customer');
    });
  }

  async updateById(customerEntity) {
    const filter = { _id: ObjectID(customerEntity.getId()) };
    const fields = { $set: customerEntity };

    return this.collection
      .updateOne(filter, fields)
      .then((result) => {
        notFoundHandler(result.result.n, 'Customer');
      })
      .catch(upsertErrorHandler);
  }
}

module.exports = CustomersRepository;
