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
    name, link, owner: _id, likes: _id,
  })
    .then((ad) => res.send({ data: ad }))
    .catch((err) => res.status(500).send({ message: err }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => (!card ? res.status(404).send({ message: 'Произошла ошибка' }) : res.send({ data: card })))
    .catch((err) => res.status(404).send({ message: err }));
};

module.exports = { showAllCards, postCard, deleteCard };
