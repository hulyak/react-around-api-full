const cardsRouter = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardsRouter;
