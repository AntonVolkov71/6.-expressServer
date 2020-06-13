const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const routes = require('./routes');

const { PORT, DATABASE_URL } = require('./config');

const nextError = require('./middlewares/nextError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(DATABASE_URL, {
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
