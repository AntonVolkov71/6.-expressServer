const mongoose = require('mongoose');

const Card = require('../models/card');

const showAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name, link, owner: _id,
  })
    .then((add) => res.send({ data: add }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    Card.findByIdAndRemove(req.params._id)
      .then((card) => (!card ? res.status(404).send({ message: 'Карточка не найдена' }) : res.send({ data: card })))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Невалидный id' });
  }
};


module.exports = { showAllCards, postCard, deleteCard };
