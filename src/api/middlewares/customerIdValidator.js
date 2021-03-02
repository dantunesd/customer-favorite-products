const { ObjectId } = require('mongodb');
const ValidationError = require('../../errors/ValidationError');

function customerIDValidator(req, res, next) {
  const { customerId } = req.params;

  if (!ObjectId.isValid(customerId)) {
    const apiProblem = new ValidationError('The customerId is invalid');
    return next(apiProblem);
  }

  return next();
}

module.exports = customerIDValidator;
