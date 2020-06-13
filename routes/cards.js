const router = require('express').Router();

const { postCard, showAllCards, deleteCard } = require('../controllers/cards');
const { postCardCelebrate, idCelebrate } = require('../celebrates/celebrates');

router.get('/', showAllCards);
router.post('/', postCardCelebrate, postCard);
router.delete('/:_id', idCelebrate, deleteCard);

module.exports = router;
