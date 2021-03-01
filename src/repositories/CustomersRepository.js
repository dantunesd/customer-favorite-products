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
      const insertResult = await collection.insertOne(customerData);

      return insertResult.insertedId;
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

    const findResult = await collection.findOne(
      { _id: ObjectID(customerId) },
      { projection: { _id: true, name: true, email: true } },
    );

    if (!findResult) {
      throw new CustomerNotFoundError();
    }

    return findResult;
  }

  async delete(customerId) {
    const collection = this.mongodbClient
      .db(dbName)
      .collection(collectionName);

    const deleteResult = await collection.deleteOne(
      { _id: ObjectID(customerId) },
    );

    if (!deleteResult.result.n) {
      throw new CustomerNotFoundError();
    }
  }

  async update(customerId, customerData) {
    const collection = this.mongodbClient
      .db(dbName)
      .collection(collectionName);

    try {
      const updateResult = await collection.updateOne(
        { _id: ObjectID(customerId) }, { $set: customerData },
      );

      if (!updateResult.result.n) {
        throw new CustomerNotFoundError();
      }
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
}

module.exports = CustomersRepository;
