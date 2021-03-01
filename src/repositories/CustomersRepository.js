const { MongoError, ObjectID } = require('mongodb');
const DuplicatedEmailError = require('../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../errors/CustomerNotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';
const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';

function isDuplicateKeyError(e) {
  return e instanceof MongoError && e.message.includes(duplicateErrorMessage);
}

function handleUpsertError(e) {
  if (isDuplicateKeyError(e)) {
    throw new DuplicatedEmailError();
  }
  throw e;
}

function handleCustomerExistence(exists) {
  if (!exists) {
    throw new CustomerNotFoundError();
  }
}

class CustomersRepository {
  constructor(mongoClient) {
    this.collection = mongoClient.db(dbName).collection(collectionName);
  }

  async create(customerData) {
    return this.collection
      .insertOne(customerData)
      .then((result) => result.insertedId)
      .catch(handleUpsertError);
  }

  async getById(customerId) {
    const filter = { _id: ObjectID(customerId) };
    const projection = { _id: true, name: true, email: true };

    return this.collection.findOne(filter, projection).then((result) => {
      handleCustomerExistence(result);
      return result;
    });
  }

  async deleteById(customerId) {
    const filter = { _id: ObjectID(customerId) };

    return this.collection.deleteOne(filter).then((result) => {
      handleCustomerExistence(result.result.n);
    });
  }

  async updateById(customerId, customerData) {
    const filter = { _id: ObjectID(customerId) };
    const fields = { $set: customerData };

    return this.collection
      .updateOne(filter, fields)
      .then((result) => {
        handleCustomerExistence(result.result.n);
      })
      .catch(handleUpsertError);
  }
}

module.exports = CustomersRepository;
