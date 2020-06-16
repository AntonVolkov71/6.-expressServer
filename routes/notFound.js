const NotFoundError = require('../errors/notFoundError');

const error = 'Запрашиваемый ресурс не найден';

const notFound = () => {
  throw new NotFoundError(error);
};

module.exports = notFound;
