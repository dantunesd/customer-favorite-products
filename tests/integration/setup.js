const { ObjectId } = require('mongodb');
const mongoClient = require('../../src/factories/mongoClientFactory');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';
const collection = mongoClient.db(dbName).collection(collectionName);

module.exports = async () => {
  await collection.deleteMany({});

  // to customers test cases
  await collection.insertOne({
    _id: ObjectId('603ae34e540e915345f00f2e'),
    email: 'existing@email.com',
    name: 'existing name',
  });

  await collection.insertOne({
    _id: ObjectId('603ae34e540e915345f00f2f'),
    email: 'toUpdate@email.com',
    name: 'toUpdate',
  });

  await collection.insertOne({
    _id: ObjectId('603ae34e540e915345f00f2c'),
    email: 'toDelete@email.com',
    name: 'toDelete',
  });

  // to favorite products test cases
  await collection.insertOne({
    _id: ObjectId('603eaa775d7e15717d65430d'),
    email: 'toAddProduct@email.com',
    name: 'toAddProduct',
  });

  await collection.insertOne({
    _id: ObjectId('603ead3f711f9ad8a8686b8b'),
    email: 'toGetProduct@email.com',
    name: 'toGetProduct',
    favoriteProducts: [
      {
        productId: 'bf0f365-fbdd-4e21-9786-da459d78dd1f',
        productData: 'data...',
      },
      {
        productId: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
        productData: 'data...',
      },
    ],
  });

  await collection.insertOne({
    _id: ObjectId('603eafafb9935c2e72b98ce8'),
    email: 'toDeleteProduct@email.com',
    name: 'toDeleteProduct',
    favoriteProducts: [
      {
        productId: 'bf0f365-fbdd-4e21-9786-da459d78dd1f',
        productData: 'data...',
      },
      {
        productId: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
        productData: 'data...',
      },
    ],
  });
};
