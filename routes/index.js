const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  postUser, login,
} = require('../controllers/users');

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');

router.post('/signin', login);
router.post('/signup', postUser);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);
router.use('/', notFound);

module.exports = router;
