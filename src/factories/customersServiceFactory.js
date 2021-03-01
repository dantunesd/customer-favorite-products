const { MongoClient } = require('mongodb');
const environment = require('../infrastructure/environment');
const CustomersService = require('../services/CustomersService');
const CustomersRepository = require('../repositories/CustomersRepository');

const mongoClient = new MongoClient(environment.CUSTOMERS_DB_URL, {
  useUnifiedTopology: true,
});
mongoClient.connect();

const customersRepository = new CustomersRepository(mongoClient);
const customersService = new CustomersService(customersRepository);

module.exports = customersService;
