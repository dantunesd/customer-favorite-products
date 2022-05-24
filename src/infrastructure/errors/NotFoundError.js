class NotFoundError extends Error {
  constructor(what) {
    super(`${what} Not Found`);
  }
}

module.exports = NotFoundError;
