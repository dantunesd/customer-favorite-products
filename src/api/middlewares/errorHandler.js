const ApiProblem = require('api-problem');
const ValidationError = require('../../errors/ValidationError');
const DuplicatedEmailError = require('../../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../../errors/CustomerNotFoundError');

function errorHandler(err, req, res, next) {
  let apiProblem;

  switch (true) {
    case err instanceof SyntaxError:
    case err instanceof ValidationError:
      apiProblem = new ApiProblem(400, err.message);
      break;

    case err instanceof CustomerNotFoundError:
      apiProblem = new ApiProblem(404, err.message);
      break;

    case err instanceof DuplicatedEmailError:
      apiProblem = new ApiProblem(422, err.message);
      break;

    default:
      apiProblem = new ApiProblem(500);
      break;
  }

  apiProblem.send(res);

  return next(err);
}

module.exports = errorHandler;
