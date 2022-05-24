require('dotenv').config();

const { ObjectId } = require('mongodb');
const mongoClient = require('../../src/infrastructure/factories/mongoClientFactory');

const dbName = 'customerFavoriteProductsDB';
const collectionName = 'customersFavoriteProducts';
const collection = mongoClient.db(dbName).collection(collectionName);

module.exports = async () => {
  await collection.deleteMany({}).then(async () => {
    await collection.insertMany([
      {
        _id: ObjectId('60414460d8e584861539454d'),
        email: 'existing@email.com',
        name: 'existing name',
      },
      {
        _id: ObjectId('603ae34e540e915345f00f2f'),
        email: 'toUpdate@email.com',
        name: 'toUpdate',
      },
      {
        _id: ObjectId('603ae34e540e915345f00f2c'),
        email: 'toDelete@email.com',
        name: 'toDelete',
      },
      {
        _id: ObjectId('603eaa775d7e15717d65430d'),
        email: 'toAddProduct@email.com',
        name: 'toAddProduct',
      },
      {
        _id: ObjectId('603ead3f711f9ad8a8686b8b'),
        email: 'toGetProduct@email.com',
        name: 'toGetProduct',
        favoriteProducts: [
          {
            price: 1.0,
            image: 'image',
            brand: 'brand',
            id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
            title: 'title',
          },
          {
            price: 1.0,
            image: 'image',
            brand: 'brand',
            id: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
            title: 'title',
          },
        ],
      },
      {
        _id: ObjectId('603eafafb9935c2e72b98ce8'),
        email: 'toDeleteProduct@email.com',
        name: 'toDeleteProduct',
        favoriteProducts: [
          {
            price: 1.0,
            image: 'image',
            brand: 'brand',
            id: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',
            title: 'title',
          },
          {
            price: 1.0,
            image: 'image',
            brand: 'brand',
            id: '958ec015-cfcf-258d-c6df-1721de0ab6ea',
            title: 'title',
          },
        ],
      },
    ]);
  });
};
