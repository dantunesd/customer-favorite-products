class FavoriteProductsService {
  constructor(favoriteProductsRepository, productsRepository) {
    this.favoriteProductsRepository = favoriteProductsRepository;
    this.productsRepository = productsRepository;
  }

  async addFavoriteProduct(customerId, productId) {
    const productEntity = await this.productsRepository.getById(productId);

    return this.favoriteProductsRepository.addByCustomerId(
      customerId,
      productEntity,
    );
  }

  async getFavoriteProducts(customerId) {
    return this.favoriteProductsRepository.getByCustomerId(customerId);
  }

  async deleteFavoriteProduct(customerId, productId) {
    return this.favoriteProductsRepository.deleteByCustomerIdAndProductId(
      customerId,
      productId,
    );
  }
}

module.exports = FavoriteProductsService;
