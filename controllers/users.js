const user = require('../models/user')

module.exports.getUser = (req, res) => {
  user.find({})
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .send({data: user})
      } else {
        return res
          .status(404)
          .send({message: "Пользователь с таким id не найден"})
      }
    })
    .catch((err) => res.status(500).send({message: err.message}))
};

module.exports.getUserId = (req, res) => {
  const {userId} = req.params;
  return user.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      } else if (!userId) {
        return res
          .status(404)
          .send({message: "Запрашиваемый пользователь не найден"});
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({
            message: "Переданы некорректные данные при поиске пользователя",
          });
      }
      res
        .status(500)
        .send({message: "Ошибка"});
    });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  user.create({name, about, avatar})
    .then((user) => {
      if (user) {
        return res.status(200).send({data: user})
      } else {
        return res
          .status(500)
          .send({message: "Некорректные данные"})
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({message: "Некорректные данные"})
      }
    })
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body
  user.findByIdAndUpdate(req.user._id, {name, about})
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({data: user})
      } else {
        return res
          .status(404)
          .send({message: "Пользователь не найден"})
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({message: "Некорректные данные"})
      }
    })
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body
  user.findByIdAndUpdate(req.user._id, {avatar})
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({data: user})
      } else {
        return res.status(404)
          .send({message: "Пользователь не найден"})
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({message: "Некорректные данные"})
      }
    })
}