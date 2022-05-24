const { MongoClient } = require('mongodb');
const { DB_URL } = require('../environment');

const mongoClient = new MongoClient(DB_URL, {
  useUnifiedTopology: true,
  connectTimeoutMS: 2000,
  socketTimeoutMS: 2000,
  serverSelectionTimeoutMS: 2000,
});
mongoClient.connect();

module.exports = mongoClient;
