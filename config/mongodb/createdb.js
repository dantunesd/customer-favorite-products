/* eslint-disable no-undef */
db.createCollection('customersFavoriteProducts');
db.customersFavoriteProducts.createIndex({ email: 1 }, { unique: true });
