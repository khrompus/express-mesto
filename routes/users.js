const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateAvatar);
module.exports = router;
