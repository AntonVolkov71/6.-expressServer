const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const showOneUser = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);


  if (validId) {
    User.findById(req.params._id)
      .then((user) => (user ? res.send({ data: user }) : res.status(404).send({ message: 'пользователь не найден' })))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Невалидный id' });
  }
};

const showAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};


const postUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user.omitPrivate() }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
      res.status(statusCode).send({
        message: statusCode === 500 ? 'Произошла ошибка' : err.message,
      });
    });
};

module.exports = {
  showAllUsers, showOneUser, postUser, login,
};
