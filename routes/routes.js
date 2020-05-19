const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');


router.use('/users', users);
router.use('/cards', cards);
router.use('/', notFound);

module.exports = router;
