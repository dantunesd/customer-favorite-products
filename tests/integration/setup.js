const { ObjectId } = require('mongodb');
const mongoClient = require('../../src/factories/mongoClientFactory');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';
const collection = mongoClient.db(dbName).collection(collectionName);

collection.deleteMany({});

collection.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2e'),
  email: 'existing@email.com',
  name: 'existing name',
});

collection.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2f'),
  email: 'existing2@email.com',
  name: 'existing2 name',
});

collection.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2c'),
  email: 'existing3@email.com',
  name: 'existing3 name',
});
