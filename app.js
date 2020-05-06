
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users.js');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
const error = { message: 'Запрашиваемый ресурс не найден' };
app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

const notFound = (req, res) => {
  res.status(404).send(error);
};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use('/users', users);
app.use('/cards', cards);
app.use('/', notFound);
app.listen({ host: 'localhost', port: PORT });
