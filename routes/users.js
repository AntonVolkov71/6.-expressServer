'use strict';

const users = require('express').Router();
const user = require('../data/users.json');

const error = { message: 'Нет пользователя с таким id' };
let infoUser = '';

const showAllUsers = (req, res) => {
  res.send(user);
};

const checkID = (req, res, next) => {
  const { id } = req.params;

  const checkId = user.filter((el) => {
    // eslint-disable-next-line no-underscore-dangle
    return el._id === id;
  });
  infoUser = checkId;

  const sendErr = () => {
    res.status(404).send(error);
  };

  if (checkId.length > 0) {
    next();
  } else {
    sendErr();
  }
};

const showUser = (req, res) => {
  res.send(infoUser);
};

users.get('/', showAllUsers);
users.get('/:id', checkID);
users.get('/:id', showUser);

module.exports = users;
