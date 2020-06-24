const mongoose = require('mongoose');

const Card = require('../models/card');

const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

const showAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  return Card.create({
    name, link, owner: _id,
  })
    .then((add) => {
      res.send({ data: add });
    })
    .catch((err) => {
      let error = err;

      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError(err.message);
      }
      return next(error);
    });
};

const deleteCard = (req, res, next) => Card.findById(req.params._id)
  .then((card) => {
    if (!card) {
      return Promise.reject(new NotFoundError('Карточки с данным _id не существует'));
    }

    const ownerValid = card.owner.equals(req.user._id);
    return card && ownerValid
      ? Card.deleteOne(card).then(res.send({ data: card }))
      : Promise.reject(new ForbiddenError('Вы не можете удалить карточку, которую не создавали'));
  })
  .catch(next);

module.exports = { showAllCards, postCard, deleteCard };
