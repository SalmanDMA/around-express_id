const express = require('express');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = express.Router();

// GET /cards
router.get('/cards', getAllCards);

// POST /cards
router.post('/cards', createCard);

// DELETE /cards/:cardId
router.delete('/cards/:cardId', deleteCard);

// PUT /cards/:cardId/likes - Like a card
router.put('/cards/:cardId/likes', likeCard);

// DELETE /cards/:cardId/likes - Dislike a card
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
