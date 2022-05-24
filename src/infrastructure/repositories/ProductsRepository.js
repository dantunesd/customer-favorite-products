const axios = require('axios').default;
const BusinessError = require('../errors/BusinessError');
const ProductEntity = require('../../domain/ProductEntity');

class ProductsRepository {
  constructor(productsApiUrl) {
    this.productsApiUrl = productsApiUrl;
  }

  async getById(productId) {
    return axios
      .get(this.productsApiUrl.replace('%', productId), {
        timeout: 2000,
      })
      .then(
        (response) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          new ProductEntity(
            response.data.id,
            response.data.price,
            response.data.title,
            response.data.image,
            response.data.reviewScore,
          ),
      )
      .catch((e) => {
        if (e.response.status === 404) {
          throw new BusinessError('This product not exists');
        }
        throw e;
      });
  }
}

module.exports = ProductsRepository;
