const Ajv = require('ajv').default;
const ajvFormats = require('ajv-formats').default;
const ValidationError = require('../../infrastructure/errors/ValidationError');
const customerSchema = require('../schemas/customerData.json');

const ajv = new Ajv({
  allErrors: true,
});

ajvFormats(ajv, ['email']);

function customerDataValidator(req, res, next) {
  if (!ajv.validate(customerSchema, req.body)) {
    const apiProblem = new ValidationError(ajv.errorsText());
    return next(apiProblem);
  }

  return next();
}

module.exports = customerDataValidator;
