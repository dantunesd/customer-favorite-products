const { MongoClient } = require('mongodb');
const { DB_URL } = require('../infrastructure/environment');

const mongoClient = new MongoClient(DB_URL, {
  useUnifiedTopology: true,
});
mongoClient.connect();

module.exports = mongoClient;
