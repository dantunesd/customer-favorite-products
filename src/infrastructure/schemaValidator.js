const Ajv = require('ajv').default;
const ValidationError = require('../errors/ValidationError');

const ajv = new Ajv({
  allErrors: true,
});

function validateSchemma(schema, data) {
  if (!ajv.validate(schema, data)) {
    throw new ValidationError(JSON.stringify(ajv.errors));
  }
}

module.exports = validateSchemma;
