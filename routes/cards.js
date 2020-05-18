const path = require('path');

const router = require('express').Router();

const readerFile = require('../utils/readFile.js');
const foundFile = require('../utils/foundFile.js');
const Card = require('../models/card');

const { postCard, showAllCards, deleteCard } = require('../controllers/cards')

router.get('/', showAllCards);
router.post('/', postCard)
router.delete('/:_id', deleteCard)

module.exports = router;
