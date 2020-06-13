const { celebrate, Joi } = require('celebrate');

const weburl = new RegExp(/^https?:\/{2}/);

const signUpCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(weburl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signInCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const postCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(weburl),
  }),
});

const idCelebrate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});


module.exports = {
  signUpCelebrate, signInCelebrate, postCardCelebrate, idCelebrate,
};
