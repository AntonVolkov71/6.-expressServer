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
    Card.findById(req.params._id)
      .then((card) => {
        if (!card) {
          return res.status(404).send({ message: 'Карточки с данным _id не существует' });
        }

        const ownerValid = card.owner.equals(req.user._id);

        if (card && ownerValid) {
          return Card.deleteOne(card)
            .then(res.send({ data: card }))
            .catch((err) => {
              throw new Error(err);
            });
        }

        return res.status(403).send({ message: 'Вы не можете удалить карточку, которую не создавали' });
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'Невалидный id' });
  }
};

module.exports = { showAllCards, postCard, deleteCard };
