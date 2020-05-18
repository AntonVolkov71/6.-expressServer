const Card = require('../models/card')

const showAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const postCard = (req, res) => {
  const { name, link } = req.body;

  console.log(req.user._id)

  const { _id } = req.user

  Card.create({ name, link, owner: _id, likes: _id })
    .populate(['owner', 'likes'])
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { showAllCards, postCard, deleteCard }

