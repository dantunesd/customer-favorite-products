const NotFoundError = require('./NotFoundError');

class ProductNotFoundError extends NotFoundError {
  constructor() {
    super('Product');
  }
}

module.exports = ProductNotFoundError;
