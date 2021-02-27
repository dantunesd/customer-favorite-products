const { MongoClient } = require('mongodb');
const environment = require('../infrastructure/environment');
const CustomersService = require('../services/CustomersService');
const CustomersRepository = require('../repositories/CustomersRepository');

const client = new MongoClient(environment.CUSTOMERS_DB_URL, {
  useUnifiedTopology: true,
});
client.connect();

const customersRepository = new CustomersRepository(client);
const customersService = new CustomersService(customersRepository);

module.exports = customersService;
