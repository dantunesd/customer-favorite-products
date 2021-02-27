const ApiProblem = require('api-problem');
const ValidationError = require('../errors/ValidationError');

function errorHandler(err, req, res, next) {
  let apiProblem;

  switch (true) {
    case err instanceof SyntaxError:
    case err instanceof ValidationError:
      apiProblem = new ApiProblem(400, err.message);
      break;

    default:
      apiProblem = new ApiProblem(500, err.message);
      break;
  }

  apiProblem.send(res);

  return next();
}

module.exports = errorHandler;
