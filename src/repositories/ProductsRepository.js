const axios = require('axios').default;
const BusinessError = require('../errors/BusinessError');

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
          throw new BusinessError('This product not exists');
        }
        throw e;
      });
  }
}

module.exports = ProductsRepository;
