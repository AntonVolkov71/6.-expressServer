const router = require('express').Router();

const User = require('../models/user');

const { showAllUsers, showOneUser, postUser } = require('../controllers/users')

router.post('/',postUser)


router.get('/', showAllUsers);
router.get('/:_id', showOneUser);


module.exports = router;


