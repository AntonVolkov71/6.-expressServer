const router = require('express').Router();
const { idCelebrate } = require('../celebrates/celebrates');

const {
  showAllUsers, showOneUser,
} = require('../controllers/users');

router.get('/', showAllUsers);
router.get('/:_id', idCelebrate, showOneUser);

module.exports = router;
