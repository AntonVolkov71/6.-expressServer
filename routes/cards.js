const path = require('path');

const cards = require('express').Router();

const readerFile = require('../utils/readFile.js');
const foundFile = require('../utils/foundFile.js');

const errornNotFoundFile = { message: 'Запрашиваемый файл не найден' };
const errorEmpty = { message: 'Запрашиваемый файл невалиден' };

const cardPath = path.resolve('data', 'cards.json');

const showcards = (req, res) => {
  if (foundFile(cardPath)) {
    readerFile(cardPath, (data) => {
      try {
        const allCards = JSON.parse(data);
        res.send(allCards);
      } catch (err) {
        res.status(500).send(errorEmpty);
      }
    });
  } else {
    res.status(500).send(errornNotFoundFile);
  }
};

cards.get('/', showcards);

module.exports = cards;
