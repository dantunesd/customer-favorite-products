class FavoriteProductsService {
  constructor(favoriteProductsRepository) {
    this.favoriteProductsRepository = favoriteProductsRepository;
  }

  async addFavoriteProduct(customerId, productId) {
    // validate product existence with luizalabs API

    const product = {
      productId,
      // complete data from product API
    };

    // saves after validation
    return this.favoriteProductsRepository.addByCustomerId(customerId, product);
  }
}

module.exports = FavoriteProductsService;
