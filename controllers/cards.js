const mongoose = require('mongoose');

const Card = require('../models/card');

const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
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
    .catch((err) => {
      let error = err;
      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError();
      }

      const statusCode = error.statusCode || 500;
      return res
        .status(statusCode)
        .send({
          message: statusCode === 500 ? serverError : err.message,
        });
    });
};

const deleteCard = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return Card.findById(req.params._id)
      .then((card) => {
        if (!card) {
          return Promise.reject(new NotFoundError('Карточки с данным _id не существует'));
        }

        const ownerValid = card.owner.equals(req.user._id);

        return card && ownerValid
          ? Card.deleteOne(card).then(res.send({ data: card }))
          : Promise.reject(new ForbiddenError('Вы не можете удалить карточку, которую не создавали'));
      })
      .catch((err) => {
        const statusCode = err.statusCode || 500;
        return res
          .status(statusCode)
          .send({
            message: statusCode === 500 ? serverError : err.message,
          });
      });
  }

  const { message, statusCode } = new BadRequestError('Невалидный id');

  return res
    .status(statusCode)
    .send({
      message,
    });
};

module.exports = { showAllCards, postCard, deleteCard };
