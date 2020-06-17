const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signUpCelebrate, signInCelebrate } = require('../celebrates/celebrates');
const badQuery = require('../middlewares/badQuery');

const {
  postUser, login,
} = require('../controllers/users');

const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');

const BadRequestError = require('../errors/badRequestError');

const rew = () => {
  throw new BadRequestError('Сервер сейчас упадёт');
};

router.get('/crash-test', () => {
  process.on('message', (msg) => {
    if (msg === 'Сервер сейчас упадёт') {
      // eslint-disable-next-line no-console
      console.log('Closing all connections...');
    }
  });

  setTimeout(() => {
    rew();
  }, 0);
});

router.use('/', badQuery);

router.post('/signin', signInCelebrate, login);
router.post('/signup', signUpCelebrate, postUser);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);

router.all('*', notFound);

module.exports = router;
