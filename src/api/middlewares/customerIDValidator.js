const ApiProblem = require('api-problem');
const { ObjectId } = require('mongodb');

function customerIDValidator(req, res, next) {
  const { customerId } = req.params;

  if (!ObjectId.isValid(customerId)) {
    const apiProblem = new ApiProblem(400, 'The customerId is invalid');
    return apiProblem.send(res);
  }

  return next();
}

module.exports = customerIDValidator;
