const jwt = require('jsonwebtoken');

const UnathorizedError = require('../errors/unathorizedError');

const auth = (req, res, next) => {
  const errorAuth = () => { throw new UnathorizedError('Необходима авторизация'); };

  const myKey = process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'super-strong-secret';

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) errorAuth();


  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, myKey);
  } catch (err) {
    errorAuth();
  }

  req.user = payload;

  return next();
};

module.exports = auth;
