class DuplicatedKeyError extends Error {
  constructor(key) {
    super(`This ${key} is already in use`);
  }
}

module.exports = DuplicatedKeyError;
