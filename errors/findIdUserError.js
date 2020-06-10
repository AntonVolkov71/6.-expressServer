
class FindIdUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = FindIdUserError;
