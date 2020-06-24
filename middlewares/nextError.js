const serverError = require('../errors/textErrors/serverError');

const nextError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? serverError : err.message,
    });
  return next();
};

module.exports = nextError;
