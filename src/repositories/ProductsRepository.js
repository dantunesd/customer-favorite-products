const axios = require('axios').default;
const ValidationError = require('../errors/ValidationError');

class ProductsRepository {
  constructor(productsApiUrl) {
    this.productsApiUrl = productsApiUrl;
  }

  async getById(productId) {
    return axios
      .get(this.productsApiUrl.replace('%', productId), {
        timeout: 2000,
      })
      .then((response) => response.data)
      .catch((e) => {
        if (e.response.status === 404) {
          throw new ValidationError(e.response.data.error_message);
        }
        throw e;
      });
  }
}

module.exports = ProductsRepository;
