/* eslint-disable */
const user = require('../models/user');

module.exports.getUser = (req, res) => {
  user.find({})
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  return user.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      } if (!userId) {
        return res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      {

      }
      res
        .status(500)
        .send({ message: 'Ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      return res
        .status(404)
        .send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Невалидный id пользователя' });
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      return res.status(404)
        .send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Невалидный id пользователя' });
      }
      res.status(500).send({ message: err.message });
    });
};
