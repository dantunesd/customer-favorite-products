const mongoClient = require('./mongoClientFactory');
const CustomersService = require('../../application/CustomersService');
const CustomersRepository = require('../repositories/CustomersRepository');

const customersRepository = new CustomersRepository(mongoClient);
const customersService = new CustomersService(customersRepository);

module.exports = customersService;
