
const path = require('path');

const express = require('express');

const usersPath = path.join(__dirname, 'routes', 'users.js');
const users = require(usersPath);

const cardsPath = path.join(__dirname, 'routes', 'cards.js');
const cards = require(cardsPath);

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const app = express();
const error = { message: 'Запрашиваемый ресурс не найден' };
app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
  console.log(`Дата запроса: ${new Date()}`);
  console.log(`Метод запроса: ${req.method}`);
  console.log(`Шо открыли: ${req.url}`);

  next();
};

const notFound = (req, res) => {
  res.status(404).send(error);
}


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
