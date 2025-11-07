const express = require('express');
const router = express.Router();

const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/card');
const { validateCreateCard, validateCardId } = require('../utils/validators');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, unlikeCard);

module.exports = router;