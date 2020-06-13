const router = require('express').Router();

const {
  showAllUsers, showOneUser,
} = require('../controllers/users');

router.get('/', showAllUsers);
router.get('/:_id', showOneUser);

module.exports = router;
