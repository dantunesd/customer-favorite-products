class CustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async createCustomer(customerData) {
    return this.customersRepository.create(customerData);
  }

  async findCustomer(customerId) {
    return this.customersRepository.find(customerId);
  }

  async deleteCustomer(customerId) {
    return this.customersRepository.delete(customerId);
  }

  async updateCustomer(customerId, customerData) {
    return this.customersRepository.update(customerId, customerData);
  }
}

module.exports = CustomersService;
