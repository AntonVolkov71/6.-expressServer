const router = require('express').Router();

const { showAllUsers, showOneUser, postUser } = require('../controllers/users');

router.post('/', postUser);


router.get('/', showAllUsers);
router.get('/:_id', showOneUser);

module.exports = router;
