const ApiProblem = require('api-problem');
const { UnauthorizedError } = require('express-jwt');
const BusinessError = require('../../infrastructure/errors/BusinessError');
const NotFoundError = require('../../infrastructure/errors/NotFoundError');
const ValidationError = require('../../infrastructure/errors/ValidationError');

function errorHandler(err, req, res, next) {
  let apiProblem;

  switch (true) {
    case err instanceof ApiProblem:
      apiProblem = err;
      break;

    case err instanceof SyntaxError:
    case err instanceof ValidationError:
      apiProblem = new ApiProblem(400, err.message);
      break;

    case err instanceof UnauthorizedError:
      apiProblem = new ApiProblem(401, err.message);
      break;

    case err instanceof NotFoundError:
      apiProblem = new ApiProblem(404, err.message);
      break;

    case err instanceof BusinessError:
      apiProblem = new ApiProblem(422, err.message);
      break;

    default:
      apiProblem = new ApiProblem(500);
      break;
  }

  apiProblem.send(res);

  next();
}

module.exports = errorHandler;
