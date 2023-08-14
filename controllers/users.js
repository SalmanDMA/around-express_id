const User = require('../models/user');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving users' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    });
    return res.json(user);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error retrieving user' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: 'Error creating user' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, { name, about }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred on the server' });
  }
};

// Update user avatar
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, { avatar }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred on the server' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
