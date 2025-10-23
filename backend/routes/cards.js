const express = require('express');
const router = express.Router();

const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/card');
const { validateCreateCard, validateCardId } = require('../utils/validators');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, unlikeCard);

module.exports = router;