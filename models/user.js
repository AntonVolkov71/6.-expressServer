const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UnathorizedError = require('../errors/unathorizedError');
const ExistingUserError = require('../errors/existingUserError');
const BadRequestError = require('../errors/badRequestError');


const emailValid = (userEmail) => validator.isEmail(userEmail);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return /^https?:\/{2}/.test(url);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


userSchema.statics.validLogin = function (email, password) {
  return (password.length < 8 || !emailValid(email)
    ? Promise.reject(new BadRequestError('Неккоректные почта или пароль'))
    : Promise.resolve());
};


userSchema.statics.existingUser = function (email) {
  return this.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new ExistingUserError('Пользователь с таким email уже существует'));
      }
      return null;
    });
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')

    .then((user) => {
      if (password.length < 8 || !emailValid(email)) {
        return Promise.reject(new BadRequestError('Неккоректные почта или пароль'));
      }

      if (!user) {
        return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
