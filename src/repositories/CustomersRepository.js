/* eslint-disable prettier/prettier */
const { MongoError, ObjectID } = require('mongodb');

const DuplicatedEmailError = require('../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../errors/CustomerNotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';

class Customers {
  constructor(client) {
    this.client = client;
  }

  async create(customerData) {
    const collection = this.client
      .db('customerFavoriteProductsDB')
      .collection('customersFavoriteProducts');

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
    const collection = this.client
      .db('customerFavoriteProductsDB')
      .collection('customersFavoriteProducts');

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

module.exports = Customers;
