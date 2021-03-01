/* eslint-disable prettier/prettier */
const { MongoError, ObjectID } = require('mongodb');

const DuplicatedEmailError = require('../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../errors/CustomerNotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

class CustomersRepository {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  async create(customerData) {
    const collection = this.mongoClient
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

  async getById(customerId) {
    const collection = this.mongoClient
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

  async deleteById(customerId) {
    const collection = this.mongoClient
      .db(dbName)
      .collection(collectionName);

    const deleteResult = await collection.deleteOne(
      { _id: ObjectID(customerId) },
    );

    if (!deleteResult.result.n) {
      throw new CustomerNotFoundError();
    }
  }

  async updateById(customerId, customerData) {
    const collection = this.mongoClient
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
