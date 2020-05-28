const mongoose = require('mongoose');

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { showAllUsers, showOneUser, postUser };
