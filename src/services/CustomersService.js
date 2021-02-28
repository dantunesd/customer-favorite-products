class CustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async createCustomer(customerData) {
    await this.customersRepository.create(customerData);
  }

  async findCustomer(customerId) {
    return this.customersRepository.find(customerId);
  }

  async deleteCustomer(customerId) {
    return this.customersRepository.delete(customerId);
  }
}

module.exports = CustomersService;
