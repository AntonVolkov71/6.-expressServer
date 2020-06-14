const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signUpCelebrate, signInCelebrate } = require('../celebrates/celebrates');

const {
  postUser, login,
} = require('../controllers/users');

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signInCelebrate, login);

router.post('/signup', signUpCelebrate, postUser);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);
router.use('/', notFound);

module.exports = router;
