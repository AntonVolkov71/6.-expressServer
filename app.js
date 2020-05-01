
const path = require('path');

const express = require('express');

const usersPath = path.join(__dirname, 'routes', 'users.js');
// eslint-disable-next-line import/no-dynamic-require
const { users } = require(usersPath);

const cardsPath = path.join(__dirname, 'routes', 'cards.js');
// eslint-disable-next-line import/no-dynamic-require
const cards = require(cardsPath);

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const app = express();
const error = { message: 'Запрашиваемый ресурс не найден' };
app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
  const logWrite = {
    date: new Date(),
    method: req.method,
    url: req.url,
  };
  // eslint-disable-next-line no-console
  console.log(logWrite);
  next();
};

const notFound = (req, res) => {
  res.status(404).send(error);
};


// const notFound = (req, res, next) => {
//   const regex = /^\/users|cards\/?$/i;
//   const sendErr = () => {
//     res.status(404).send(error);
//   };

//   if (regex.test(req.url)) {
//     next();
//   } else (sendErr());
// };


app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use('/users', users);
app.use('/cards', cards);
app.use('/', notFound);
app.listen({ host: 'localhost', port: PORT });
