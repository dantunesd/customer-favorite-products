const axios = require('axios').default;
const ProductNotFoundError = require('../errors/ProductNotFoundError');

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
          throw new ProductNotFoundError();
        }
        throw e;
      });
  }
}

module.exports = ProductsRepository;
