const router = require('express').Router();

const { showAllUsers, showOneUser, postUser } = require('../controllers/users');

router.get('/', showAllUsers);
router.get('/:_id', showOneUser);
router.post('/', postUser);

module.exports = router;
