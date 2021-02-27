class CustomerNotFoundError extends Error {
  constructor() {
    super('Customer Not Found');
  }
}

module.exports = CustomerNotFoundError;
