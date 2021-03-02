class FavoriteProductsService {
  constructor(favoriteProductsRepository) {
    this.favoriteProductsRepository = favoriteProductsRepository;
    // this.productRepository = productRepository;
  }

  async addFavoriteProduct(customerId, productId) {
    // const product = this.productRepository.getProductById(productId)

    const product = {
      productId,
      // complete data from product API
    };

    // saves after validation
    return this.favoriteProductsRepository.addByCustomerId(customerId, product);
  }
}

module.exports = FavoriteProductsService;
