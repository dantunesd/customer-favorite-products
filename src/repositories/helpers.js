const { MongoError } = require('mongodb');
const DuplicatedKeyError = require('../errors/DuplicatedKeyError');
const NotFoundError = require('../errors/NotFoundError');

const duplicateErrorMessage = 'duplicate key error collection';

function isDuplicateKeyError(e) {
  return e instanceof MongoError && e.message.includes(duplicateErrorMessage);
}

function upsertErrorHandler(e) {
  if (isDuplicateKeyError(e)) {
    const key = e.message.match('{ (\\w+)')[1];
    throw new DuplicatedKeyError(key);
  }
  throw e;
}

function notFoundHandler(exists, what) {
  if (!exists) {
    throw new NotFoundError(what);
  }
}

function notUpdatedHandler(updated, what) {
  if (!updated) {
    throw new DuplicatedKeyError(what);
  }
}

module.exports = {
  upsertErrorHandler,
  notFoundHandler,
  isDuplicateKeyError,
  notUpdatedHandler,
};
