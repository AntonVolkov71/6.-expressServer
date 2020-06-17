require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const routes = require('./routes');

const nextError = require('./middlewares/nextError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const dbURL = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017/mestodb';

const PORT = process.env.NODE_ENV === 'production'
  ? process.env.PORT
  : 3000;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);


app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(nextError);

app.listen({ host: 'localhost', port: PORT });
