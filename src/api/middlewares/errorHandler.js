const ApiProblem = require('api-problem');
const DuplicatedEmailError = require('../../errors/DuplicatedEmailError');
const CustomerNotFoundError = require('../../errors/CustomerNotFoundError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let apiProblem;

  switch (true) {
    case err instanceof SyntaxError:
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

  return apiProblem.send(res);
}

module.exports = errorHandler;
