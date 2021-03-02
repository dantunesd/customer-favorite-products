const ApiProblem = require('api-problem');
const DuplicatedKeyError = require('../../errors/DuplicatedKeyError');
const NotFoundError = require('../../errors/NotFoundError');
const ValidationError = require('../../errors/ValidationError');

// eslint-disable-next-line no-unused-vars
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

    case err instanceof NotFoundError:
      apiProblem = new ApiProblem(404, err.message);
      break;

    case err instanceof DuplicatedKeyError:
      apiProblem = new ApiProblem(422, err.message);
      break;

    default:
      apiProblem = new ApiProblem(500);
      break;
  }

  return apiProblem.send(res);
}

module.exports = errorHandler;
