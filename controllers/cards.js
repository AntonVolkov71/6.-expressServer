const mongoose = require('mongoose');

const Card = require('../models/card');

const FindCardError = require('../errors/findCardError');
const OwnerDelCardError = require('../errors/ownerDelCardError');
const IdValidError = require('../errors/idValidError');

const serverError = require('../errors/serverError');

const showAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: serverError }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id,
  })
    .then((add) => {
      res.send({ data: add });
    })
    .catch((err) => (err._message === 'card validation failed'
      ? res.status(400).send({ message: err.message })
      : res.status(500).send({ message: err.message })));
};

const deleteCard = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return Card.findById(req.params._id)
      .then((card) => {
        if (!card) {
          return Promise.reject(new FindCardError('Карточки с данным _id не существует'));
        }

        const ownerValid = card.owner.equals(req.user._id);

        return card && ownerValid
          ? Card.deleteOne(card).then(res.send({ data: card }))
          : Promise.reject(new OwnerDelCardError('Вы не можете удалить карточку, которую не создавали'));
      })
      .catch((err) => res
        .status(err.statusCode || 500)
        .send({
          message: err.message || serverError,
        }));
  }

  const { message, statusCode } = new IdValidError('Невалидный id');

  return res
    .status(statusCode)
    .send({
      message,
    });
};

module.exports = { showAllCards, postCard, deleteCard };
