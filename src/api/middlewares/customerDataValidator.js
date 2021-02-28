const Ajv = require('ajv').default;
const ApiProblem = require('api-problem');

const customerSchema = require('../schemas/customerData.json');

const ajv = new Ajv({
  allErrors: true,
});

function customerDataValidator(req, res, next) {
  if (!ajv.validate(customerSchema, req.body)) {
    const apiProblem = new ApiProblem(400, ajv.errorsText());
    return next(apiProblem);
  }

  return next();
}

module.exports = customerDataValidator;
