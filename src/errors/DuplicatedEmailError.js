class DuplicatedEmailError extends Error {
  constructor() {
    super('This email is already in use');
  }
}

module.exports = DuplicatedEmailError;
