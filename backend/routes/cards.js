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

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

cardsRouter.get("/", getCards);
cardsRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard
);

cardsRouter.delete(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  deleteCard
);

cardsRouter.put(
  "/:id/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }),
  }),
  likeCard
);

cardsRouter.delete(
  "/:id/likes",
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24), // hex sequence with 24 symbols
    }),
  }),
  deleteLikeCard
);

module.exports = cardsRouter;
