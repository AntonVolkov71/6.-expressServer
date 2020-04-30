'use strict';

const cards = require('express').Router();
const card = require('../data/cards.json');


const showcards = (req, res) => {
  res.send(card);
};

cards.get('/', showcards);
module.exports = cards;
