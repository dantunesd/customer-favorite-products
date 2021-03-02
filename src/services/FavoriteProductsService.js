class FavoriteProductsService {
  constructor(favoriteProductsRepository) {
    this.favoriteProductsRepository = favoriteProductsRepository;
    // this.productRepository = productRepository;
  }

  async addFavoriteProduct(customerId, productId) {
    // const product = this.productRepository.getProductById(productId)

    const product = {
      productId,
      productData: 'data...',
      // complete data from product API
    };

    // saves after validation
    return this.favoriteProductsRepository.addByCustomerId(customerId, product);
  }

  async getFavoriteProducts(customerId) {
    return this.favoriteProductsRepository.getByCustomerId(customerId);
  }
}

module.exports = FavoriteProductsService;
