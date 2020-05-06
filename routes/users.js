const path = require('path');

const users = require('express').Router();

const userPath = path.resolve('data', 'users.json');
const error = { message: 'Нет пользователя с таким id' };

const readerFile = require('./utils/readFile.js');

const showAllUsers = (req, res) => {
  readerFile(userPath, (data) => {
    res.send(data);
  });
};

const showOneUser = (req, res) => {
  const { id } = req.params;

  readerFile(userPath, (data) => {
    // eslint-disable-next-line no-underscore-dangle
    const dataUser = data.find((el) => el._id === id);

    if (dataUser) {
      res.send(dataUser);
    } else {
      res.status(404).send(error);
    }
  });
};

users.get('/', showAllUsers);
users.get('/:id', showOneUser);

module.exports = users;
