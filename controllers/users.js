const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const BodyDataValidError = require('../errors/bodyDataValidError');
const FindIdUserError = require('../errors/findIdUserError');
const IdValidError = require('../errors/idValidError');

const serverError = require('../errors/serverError');

const showOneUser = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return User.findById(req.params._id)
      .then((user) => (user ? res.send({ data: user }) : Promise.reject(new FindIdUserError('Пользователь не найден'))))
      .catch((err) => res
        .status(err.statusCode || 500)
        .send({
          message: err.message || serverError,
        }));
  }
  const { message, statusCode } = new IdValidError('Невалидный id');

  return res
    .status(statusCode)
    .send({
      message,
    });
};

const showAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send(err.message));
};

const postUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return User.validLogin(email, password)
    .then(() => User.existingUser(email)
      .then(() => bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(201).send({
          data: user.omitPrivate(),
        }))))
    .catch((err) => {
      if (err._message === 'user validation failed') {
        const { statusCode } = new BodyDataValidError();

        return res
          .status(statusCode)
          .send({
            message: err.message,
          });
      }

      return res
        .status(err.statusCode || 500)
        .send({
          message: err.message || serverError,
        });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => res
      .status(err.statusCode || 500)
      .send({
        message: err.message || serverError,
      }));
};

module.exports = {
  showAllUsers, showOneUser, postUser, login,
};
