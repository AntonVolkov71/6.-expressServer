const router = require('express').Router();

const { postCard, showAllCards, deleteCard } = require('../controllers/cards')

router.get('/', showAllCards);
router.post('/', postCard)
router.delete('/:_id', deleteCard)

module.exports = router;
