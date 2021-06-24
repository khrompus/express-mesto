const router = require('express').Router();
const {
  getUser, getUsers, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
module.exports = router;
