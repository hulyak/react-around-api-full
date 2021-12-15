/* eslint-disable comma-dangle */
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");
const Card = require("../models/card");

const getCards = (req, res, next) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Card.find({})
    .populate("user")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  // eslint-disable-next-line no-console
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new NotFoundError("No card found with that id");
    })
    .then((card) => {
      if (!card.owner._id !== req.user._id) {
        throw new ForbiddenError("You are not the owner of this card");
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user_id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No card found with that id");
    })
    .then((card) => {
      const {
        _doc: { ...props },
      } = card;
      res.status(200).send({ data: props });
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;

  return Card.findByIdAndRemove(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("No card found with that id");
    })
    .then((card) => {
      const {
        _doc: { ...props },
      } = card;
      res.status(200).send({ data: props });
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLikeCard,
};
