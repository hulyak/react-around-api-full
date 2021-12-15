/* eslint-disable comma-dangle */
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const cardsRouter = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLikeCard,
} = require("../controllers/cards");

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error("URL validation err");
};

cardsRouter.get("/", getCards);
cardsRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(method),
    }),
  }),
  createCard
);

cardsRouter.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard
);
cardsRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  likeCard
);

cardsRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24), // hex sequence with 24 symbols
    }),
  }),
  deleteLikeCard
);

module.exports = cardsRouter;
