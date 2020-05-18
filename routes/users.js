const path = require('path');

const router = require('express').Router();

// const userPath = path.resolve('data', 'users.json');

// const error = { message: 'Нет пользователя с таким id' };
// const errornNotFoundFile = { message: 'Запрашиваемый файл не найден' };

// const readerFile = require('../utils/readFile.js');
// const foundFile = require('../utils/foundFile.js');
const User = require('../models/user.js');

const { showAllUsers, showOneUser, postUser } = require('../controllers/users')

router.post('/',postUser)


router.get('/', showAllUsers);
router.get('/:_id', showOneUser);
//

module.exports = router;
// const showAllUsers = (req, res) => {
//   if (foundFile(userPath)) {
//     readerFile(userPath, (data) => {
//       try {
//         const allUsers = JSON.parse(data);
//         res.send(allUsers);
//       } catch (err) {
//         res.status(500).send(errorEmpty);
//       }
//     });
//   } else {
//     res.status(500).send(errornNotFoundFile);
//   }
// };

// const showOneUser = (req, res) => {
//   const { id } = req.params;

//   readerFile(userPath, (data) => {
//     try {
//       const dataUser = JSON.parse(data)
//         .find((el) => el._id === id);

//       if (dataUser) {
//         res.send(dataUser);
//       } else {
//         res.status(404).send(error);
//       }
//     } catch (err) {
//       res.status(500).send(errorEmpty);
//     }
//   });
// };


