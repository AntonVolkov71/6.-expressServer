const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const logger = require('./utils/logger');

const { PORT, DATABASE_URL } = require('./config');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.use((req, res, next) => {
  req.user = {
    _id: '5ec2ffddd3ae793bf5a25a4f',
  };
  next();
});

app.use(routes);

app.listen({ host: 'localhost', port: PORT });
