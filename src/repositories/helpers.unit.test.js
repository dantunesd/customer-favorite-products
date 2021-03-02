const { MongoError } = require('mongodb');
const DuplicatedKeyError = require('../errors/DuplicatedKeyError');
const NotFoundError = require('../errors/NotFoundError');
const {
  isDuplicateKeyError,
  upsertErrorHandler,
  notFoundHandler,
} = require('./helpers');

describe('isDuplicateKeyError test cases', () => {
  describe('given I receive a generic error', () => {
    it('should return false', async () => {
      expect(isDuplicateKeyError(new Error('some generic error'))).toBeFalsy();
    });
  });

  describe('given I receive a mongodbError, but it is not a duplicate error', () => {
    it('should return false', async () => {
      expect(
        isDuplicateKeyError(new MongoError('another dberror error')),
      ).toBeFalsy();
    });
  });

  describe('given I receive a mongodbError, and it is a duplicate error', () => {
    it('should return true', async () => {
      expect(
        isDuplicateKeyError(
          new MongoError(
            'E11000 duplicate key error collection: customerFavoriteProductsDB.customersFavoriteProducts index: email_1 dup key: { email: "email@email.com" }',
          ),
        ),
      ).toBeTruthy();
    });
  });
});

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
      const throwed = new DuplicatedKeyError('email');
      expect(() => {
        upsertErrorHandler(error);
      }).toThrow(throwed);
    });
  });
});

describe('notFoundHandler test cases', () => {
  describe('given I receive a empty data to validate', () => {
    it('should throw the NotFoundError', async () => {
      const error = new NotFoundError('myField');
      expect(() => {
        notFoundHandler(null, 'myField');
      }).toThrow(error);
    });
  });

  describe('given I receive a filled data to validate', () => {
    it('should not throw the NotFoundError', async () => {
      expect(notFoundHandler({ my: 'data' }, 'myField')).toBeUndefined();
    });
  });
});
