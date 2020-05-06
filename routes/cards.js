const path = require('path');

const cards = require('express').Router();

const readerFile = require('./utils/readFile.js');

const cardPath = path.resolve('data', 'cards.json');

const showcards = (req, res) => {
  readerFile(cardPath, (data) => {
    res.send(data);
  });
};

cards.get('/', showcards);

module.exports = cards;
