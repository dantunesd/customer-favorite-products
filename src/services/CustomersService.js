class CustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async createCustomer(customerData) {
    return this.customersRepository.create(customerData);
  }

  async getCustomer(customerId) {
    return this.customersRepository.getById(customerId);
  }

  async deleteCustomer(customerId) {
    return this.customersRepository.deleteById(customerId);
  }

  async updateCustomer(customerId, customerData) {
    return this.customersRepository.updateById(customerId, customerData);
  }
}

module.exports = CustomersService;
