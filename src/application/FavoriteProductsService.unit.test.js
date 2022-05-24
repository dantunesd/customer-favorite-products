const ProductEntity = require('../domain/ProductEntity');
const FavoriteProductsService = require('./FavoriteProductsService');

const favoriteProductsRepositoryMock = {
  addByCustomerId: jest.fn(),
  getByCustomerId: jest.fn(),
  deleteByCustomerIdAndProductId: jest.fn(),
};

const productsRepositoryMock = {
  getById: jest.fn(),
};

const favoriteProductsService = new FavoriteProductsService(
  favoriteProductsRepositoryMock,
  productsRepositoryMock,
);

const product = new ProductEntity('id', 1.0, 'title', 'image', 123456);

const getResult = {
  favoriteProducts: [
    {
      price: 1.0,
      image: 'example',
      id: 'example',
      title: 'example',
    },
  ],
};

describe('addFavoriteProduct test case', () => {
  describe('given I receive a product that not exists', () => {
    productsRepositoryMock.getById.mockRejectedValueOnce(
      new Error('This product not exists'),
    );

    it('should throw a Error', async () => {
      await expect(
        favoriteProductsService.addFavoriteProduct(1, 2),
      ).rejects.toEqual(new Error('This product not exists'));
    });

    it('should call getById with params', async () => {
      expect(productsRepositoryMock.getById).toHaveBeenLastCalledWith(2);
    });

    it('should not call addByCustomerId', async () => {
      expect(
        favoriteProductsRepositoryMock.addByCustomerId,
      ).not.toHaveBeenCalled();
    });
  });

  describe('given I receive a generic error while getting the product', () => {
    productsRepositoryMock.getById.mockRejectedValueOnce(
      new Error('Generic Error'),
    );

    it('should throw that generic error', async () => {
      await expect(
        favoriteProductsService.addFavoriteProduct(1, 2),
      ).rejects.toEqual(new Error('Generic Error'));
    });

    it('should call getById with params', async () => {
      expect(productsRepositoryMock.getById).toHaveBeenLastCalledWith(2);
    });

    it('should not call addByCustomerId', async () => {
      expect(
        favoriteProductsRepositoryMock.addByCustomerId,
      ).not.toHaveBeenCalled();
    });
  });

  describe('given I receive an error while saving the product', () => {
    productsRepositoryMock.getById.mockResolvedValueOnce(product);

    favoriteProductsRepositoryMock.addByCustomerId.mockRejectedValueOnce(
      new Error('A Repository Error'),
    );

    it('should throw that Error', async () => {
      await expect(
        favoriteProductsService.addFavoriteProduct(1, 2),
      ).rejects.toEqual(new Error('A Repository Error'));
    });

    it('should call getById with params', async () => {
      expect(productsRepositoryMock.getById).toHaveBeenLastCalledWith(2);
    });

    it('should call addByCustomerId with params', async () => {
      expect(
        favoriteProductsRepositoryMock.addByCustomerId,
      ).toHaveBeenLastCalledWith(1, product);
    });
  });

  describe('given I receive a valid product and the product was saved with success', () => {
    productsRepositoryMock.getById.mockResolvedValueOnce(product);

    favoriteProductsRepositoryMock.addByCustomerId.mockResolvedValueOnce();

    it('should add with success', async () => {
      await expect(
        favoriteProductsService.addFavoriteProduct(1, 2),
      ).resolves.toBeUndefined();
    });

    it('should call getById with params', async () => {
      expect(productsRepositoryMock.getById).toHaveBeenLastCalledWith(2);
    });

    it('should call addByCustomerId with params', async () => {
      expect(
        favoriteProductsRepositoryMock.addByCustomerId,
      ).toHaveBeenLastCalledWith(1, product);
    });
  });
});

describe('getFavoriteProducts test case', () => {
  describe('given I receive an error while getting the products', () => {
    favoriteProductsRepositoryMock.getByCustomerId.mockRejectedValueOnce(
      new Error('Generic Error'),
    );

    it('should throw that Error', async () => {
      await expect(
        favoriteProductsService.getFavoriteProducts(1),
      ).rejects.toEqual(new Error('Generic Error'));
    });

    it('should call getById with params', async () => {
      expect(
        favoriteProductsRepositoryMock.getByCustomerId,
      ).toHaveBeenLastCalledWith(1);
    });
  });

  describe('given I receive a valid customer', () => {
    favoriteProductsRepositoryMock.getByCustomerId.mockResolvedValueOnce(
      getResult,
    );

    it('should return the products list', async () => {
      await expect(
        favoriteProductsService.getFavoriteProducts(1),
      ).resolves.toEqual(getResult);
    });

    it('should call getById with params', async () => {
      expect(
        favoriteProductsRepositoryMock.getByCustomerId,
      ).toHaveBeenLastCalledWith(1);
    });
  });
});

describe('deleteFavoriteProduct test case', () => {
  describe('given I receive an error from while deleting product', () => {
    favoriteProductsRepositoryMock.deleteByCustomerIdAndProductId.mockRejectedValueOnce(
      new Error('Generic Error'),
    );

    it('should throw that Error', async () => {
      await expect(
        favoriteProductsService.deleteFavoriteProduct(1, 2),
      ).rejects.toEqual(new Error('Generic Error'));
    });

    it('should call deleteByCustomerIdAndProductId with params', async () => {
      expect(
        favoriteProductsRepositoryMock.deleteByCustomerIdAndProductId,
      ).toHaveBeenLastCalledWith(1, 2);
    });
  });

  describe('given I receive a valid customer', () => {
    favoriteProductsRepositoryMock.deleteByCustomerIdAndProductId.mockResolvedValueOnce();

    it('should delete with success', async () => {
      await expect(
        favoriteProductsService.deleteFavoriteProduct(1, 2),
      ).resolves.toBeUndefined();
    });

    it('should call deleteByCustomerIdAndProductId with params', async () => {
      expect(
        favoriteProductsRepositoryMock.deleteByCustomerIdAndProductId,
      ).toHaveBeenLastCalledWith(1, 2);
    });
  });
});
