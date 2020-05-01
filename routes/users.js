
const path = require('path');
const fs = require('fs');
const users = require('express').Router();
// const user = require('../data/users.json');
const userPath = path.resolve('data', 'users.json');




const error = { message: 'Нет пользователя с таким id' };

const readerUsers = (filePath, callback) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return callback(err);
    }
    const jsonInfo = JSON.parse(data)
    return callback(jsonInfo);
  });
};

const showAllUsers = (req, res) => {
  readerUsers(userPath, data => {
    res.send(data);
  });
};



const showOneUser = (req, res, next) => {
  const { id } = req.params;

  readerUsers(userPath, data => {

    const dataUser = data.filter((el) => {
      // eslint-disable-next-line no-underscore-dangle
      return el._id === id;
    });

    if (dataUser.length > 0) {
      res.send(dataUser);
    } else {
      res.status(404).send(error);
    };
  });
};


// usersInfo.filter((el) => {
//   console.log(el)
//   // eslint-disable-next-line no-underscore-dangle
//   return el._id === id;
// });



users.get('/', showAllUsers);
users.get('/:id', showOneUser);
// users.get('/:id', showUser);

module.exports = users;
