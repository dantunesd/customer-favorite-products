class CustomersService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async createCustomer(customerEntity) {
    return this.customersRepository.create(customerEntity);
  }

  async getCustomer(customerId) {
    return this.customersRepository.getById(customerId);
  }

  async deleteCustomer(customerId) {
    return this.customersRepository.deleteById(customerId);
  }

  async updateCustomer(customerEntity) {
    return this.customersRepository.updateById(customerEntity);
  }
}

module.exports = CustomersService;
