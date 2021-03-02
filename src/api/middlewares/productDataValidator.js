const Ajv = require('ajv').default;
const ValidationError = require('../../errors/ValidationError');
const productSchema = require('../schemas/productData.json');

const ajv = new Ajv({
  allErrors: true,
});

function productDataValidator(req, res, next) {
  if (!ajv.validate(productSchema, req.body)) {
    const apiProblem = new ValidationError(ajv.errorsText());
    return next(apiProblem);
  }

  return next();
}

module.exports = productDataValidator;
