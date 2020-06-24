const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const showOneUser = (req, res, next) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return User.findById(req.params._id)
      .then((user) => (user ? res.send({ data: user }) : Promise.reject(new NotFoundError('Пользователь не найден'))))
      .catch(next);
  }

  const error = new BadRequestError('Невалидный id');

  return next(error);
};

const showAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return User.existingUser(email)
    .then(() => bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, about, avatar, email, password: hash,
      }))
      .then((user) => res.status(201).send({
        data: user.omitPrivate(),
      })))
    .catch((err) => {
      let error = err;
      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError(err.message);
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const myKey = process.env.NODE_ENV === 'production'
    ? process.env.JWT_SECRET
    : 'super-strong-secret';

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        myKey,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  showAllUsers, showOneUser, postUser, login,
};
