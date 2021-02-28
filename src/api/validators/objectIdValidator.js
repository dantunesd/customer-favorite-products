const { ObjectId } = require('mongodb');
const ValidationError = require('../../errors/ValidationError');

function validateObjectId(value, field) {
  if (!ObjectId.isValid(value)) {
    throw new ValidationError(`The ${field} is invalid`);
  }
}

module.exports = validateObjectId;
