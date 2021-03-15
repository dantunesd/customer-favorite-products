class FavoriteProductsService {
  constructor(favoriteProductsRepository, productsRepository) {
    this.favoriteProductsRepository = favoriteProductsRepository;
    this.productsRepository = productsRepository;
  }

  async addFavoriteProduct(customerId, productId) {
    const product = await this.productsRepository.getById(productId);

    const productWithoutBrand = {
      ...product,
    };
    delete productWithoutBrand.brand;

    return this.favoriteProductsRepository.addByCustomerId(
      customerId,
      productWithoutBrand,
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
