const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const router = express.Router();

// GET /users
router.get('/users', getAllUsers);

// GET /users/:userId
router.get('/users/:userId', getUserById);

// POST /users
router.post('/users', createUser);

// PATCH /users/me - Update user profile
router.patch('/users/me', updateProfile);

// PATCH /users/me/avatar - Update user avatar
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
