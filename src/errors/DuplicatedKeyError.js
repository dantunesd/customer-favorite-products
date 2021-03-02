class DuplicatedKeyError extends Error {
  constructor(key) {
    super(`This ${key} is already registered`);
  }
}

module.exports = DuplicatedKeyError;
