/* eslint-disable prettier/prettier */
const { MongoError, ObjectID } = require('mongodb');

const DuplicatedEmailError = require('../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../errors/CustomerNotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class CustomersRepository {
  constructor(mongodbClient) {
    this.mongodbClient = mongodbClient;
  }

  async create(customerData) {
    const collection = this.mongodbClient
      .db(dbName)
      .collection(collectionName);

    try {
      await collection.insertOne(customerData);
    } catch (error) {
      if (
        error instanceof MongoError
        && error.message.includes(duplicateErrorMessage)
      ) {
        throw new DuplicatedEmailError();
      }
      throw error;
    }
  }

  async find(customerId) {
    const collection = this.mongodbClient
      .db(dbName)
      .collection(collectionName);

    const result = await collection.findOne(
      { _id: ObjectID(customerId) },
      { projection: { _id: true, name: true, email: true } },
    );

    if (!result) {
      throw new CustomerNotFoundError();
    }

    return result;
  }
}

module.exports = CustomersRepository;
