const path = require('path');


const users = require('express').Router();

const userPath = path.resolve('data', 'users.json');

const error = { message: 'Нет пользователя с таким id' };
const errornNotFoundFile = { message: 'Запрашиваемый файл не найден' };
const errorEmpty = { message: 'Запрашиваемый файл пуст' };

const readerFile = require('../utils/readFile.js');
const foundFile = require('../utils/foundFile.js');

const showAllUsers = (req, res) => {
  if (foundFile(userPath)) {
    readerFile(userPath, (data) => {
      try {
        const allUsers = JSON.parse(data);
        res.send(allUsers);
      } catch (err) {
        res.send(errorEmpty);
      }
    });
  } else {
    res.send(errornNotFoundFile);
  }
};

const showOneUser = (req, res) => {
  const { id } = req.params;

  readerFile(userPath, (data) => {
    try {
      const dataUser = JSON.parse(data)
        // eslint-disable-next-line no-underscore-dangle
        .find((el) => el._id === id);

      if (dataUser) {
        res.send(dataUser);
      } else {
        res.status(404).send(error);
      }
    } catch (err) {
      res.send(errornNotFoundFile);
    }
  });
};

users.get('/', showAllUsers);
users.get('/:id', showOneUser);

module.exports = users;
