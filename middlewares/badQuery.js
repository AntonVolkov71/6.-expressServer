const NotFoundError = require('../errors/notFoundError');

const BadQuery = (req, res, next) => {
  const { url } = req;

  const webUrl = new RegExp(/^((\/|\/signin|\/signup)$|((\/users|\/cards)\/?(\/([a-f\d]){24})?$))/);

  if (!webUrl.test(url) || url === '/') {
    const error = new NotFoundError('Запрашиваемый ресурс не найден');
    return next(error);
  }
  return next();
};

module.exports = BadQuery;
