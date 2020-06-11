const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const serverError = require('../errors/serverError');

const showOneUser = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return User.findById(req.params._id)
      .then((user) => (user ? res.send({ data: user }) : Promise.reject(new NotFoundError('Пользователь не найден'))))
      .catch((err) => {
        const statusCode = err.statusCode || 500;
        return res
          .status(statusCode)
          .send({
            message: statusCode === 500 ? serverError : err.message,
          });
      });
  }

  const { message, statusCode } = new BadRequestError('Невалидный id');

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
      let error = err;
      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError();
      }

      const statusCode = error.statusCode || 500;
      return res
        .status(statusCode)
        .send({
          message: statusCode === 500 ? serverError : err.message,
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
    .catch((err) => {
      const statusCode = err.statusCode || 500;
      return res
        .status(statusCode)
        .send({
          message: statusCode === 500 ? serverError : err.message,
        });
    });
};

module.exports = {
  showAllUsers, showOneUser, postUser, login,
};
