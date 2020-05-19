
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');
const app = express();
const error = { message: 'Запрашиваемый ресурс не найден' };

app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(new Date(), req.method, req.url);
  next();
};

const notFound = (req, res) => {
  res.status(404).send(error);
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use((req, res, next) => {
  req.user = {
      _id: '5ec2ffddd3ae793bf5a25a4f'
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use('/', notFound);
app.listen({ host: 'localhost', port: PORT });
