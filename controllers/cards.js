/* eslint-disable no-shadow */
const card = require('../models/card');
// создание карточки

module.exports.createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;
  card.create({ name, link, owner: ownerId })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// получение карточки

module.exports.getCard = (req, res) => {
  card.find({})
    .populate('owner', 'likes')
    .then((card) => {
      if (card) {
        return res
          .status(200)
          .send({ data: card });
      }
      return res
        .status(404)
        .send({ message: 'Карточки не найдены' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// удаление карточки по id

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return res
          .status(200)
          .send({ data: card });
      }
      return res
        .status(404)
        .send({ message: 'Карточки не найдены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id ' });
      }
    });
};

// поставить лайк

module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res
          .status(200)
          .send({ data: card });
      }
      return res
        .status(404)
        .send({ message: 'Карточки не найдены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id ' });
      }
    });
};

// удалить лайк

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res
          .status(200)
          .send({ data: card });
      }
      return res
        .status(404)
        .send({ message: 'Карточки не найдены' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id ' });
      }
    });
};
