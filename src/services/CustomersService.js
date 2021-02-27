class CustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async createCustomer(customerData) {
    await this.customersRepository.create(customerData);
  }
}

module.exports = CustomersService;
