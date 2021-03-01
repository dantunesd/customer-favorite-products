/* eslint-disable no-undef */
db.createCollection('customersFavoriteProducts');
db.customersFavoriteProducts.createIndex({ email: 1 }, { unique: true });

db.customersFavoriteProducts.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2e'),
  email: 'existing@email.com',
  name: 'existing name',
});

db.customersFavoriteProducts.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2f'),
  email: 'existing2@email.com',
  name: 'existing2 name',
});

db.customersFavoriteProducts.insertOne({
  _id: ObjectId('603ae34e540e915345f00f2c'),
  email: 'existing3@email.com',
  name: 'existing3 name',
});
