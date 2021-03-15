const { MongoError } = require('mongodb');
const BusinessError = require('../errors/BusinessError');
const NotFoundError = require('../errors/NotFoundError');
const {
  upsertErrorHandler,
  notFoundHandler,
  productDuplicatedHandler,
} = require('./helpers');

describe('upsertErrorHandler test cases', () => {
  describe('given I receive a generic error', () => {
    it('should throw the same error', async () => {
      const error = new Error('some generic error');
      expect(() => {
        upsertErrorHandler(error);
      }).toThrow(error);
    });
  });

  describe('given I receive a mongodbError, but it is not a duplicate error', () => {
    it('should throw the same error', async () => {
      const error = new MongoError('another dberror error');
      expect(() => {
        upsertErrorHandler(error);
      }).toThrow(error);
    });
  });

  describe('given I receive a mongodbError, and it is a duplicate error', () => {
    it('should throw the DuplicateKeyError', async () => {
      const error = new MongoError(
        'E11000 duplicate key error collection: customerFavoriteProductsDB.customersFavoriteProducts index: email_1 dup key: { email: "email@email.com" }',
      );
      expect(() => {
        upsertErrorHandler(error);
      }).toThrow(new BusinessError('This email is already registered'));
    });
  });
});

describe('notFoundHandler test cases', () => {
  describe('given I receive a empty value', () => {
    it('should throw the NotFoundError', async () => {
      expect(() => {
        notFoundHandler(null, 'Customer');
      }).toThrow(new NotFoundError('Customer'));
    });
  });

  describe('given I receive a non empty value', () => {
    it('should not throw the NotFoundError', async () => {
      expect(notFoundHandler({ my: 'data' }, 'Customer')).toBeUndefined();
    });
  });
});

describe('productDuplicatedHandler test cases', () => {
  describe('given I receive a document that matched and item was added', () => {
    it('should not throw the NotFoundError', async () => {
      expect(productDuplicatedHandler(1, 1)).toBeUndefined();
    });
  });

  describe('given I receive a document that not matched', () => {
    it('should not throw the NotFoundError', async () => {
      expect(productDuplicatedHandler(0, 1)).toBeUndefined();
    });
  });

  describe('given I receive a document that matched and item was not added', () => {
    it('should throw BusinessError', async () => {
      expect(() => {
        productDuplicatedHandler(1, 0);
      }).toThrow(new BusinessError('This product is already registered'));
    });
  });
});
