const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

  const myKey = process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'super-strong-secret';

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, myKey);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};

module.exports = auth;
