const { MongoError } = require('mongodb');
const BusinessError = require('../errors/BusinessError');
const NotFoundError = require('../errors/NotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';

function isDuplicateKeyError(e) {
  return e instanceof MongoError && e.message.includes(duplicateErrorMessage);
}

function upsertErrorHandler(e) {
  if (isDuplicateKeyError(e)) {
    const key = e.message.match('{ (\\w+)')[1];
    throw new BusinessError(`This ${key} is already registered`);
  }
  throw e;
}

function notFoundHandler(exists, what) {
  if (!exists) {
    throw new NotFoundError(what);
  }
}

function productDuplicatedHandler(documentMatched, itemAdded) {
  if (documentMatched && !itemAdded) {
    throw new BusinessError('This product is already registered');
  }
}

module.exports = {
  upsertErrorHandler,
  notFoundHandler,
  productDuplicatedHandler,
};
