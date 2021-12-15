/* eslint-disable comma-dangle */
const usersRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);

usersRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile
);

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error("URL validation err");
};

usersRouter.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  getUser
);

usersRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(method),
    }),
  }),
  updateAvatar
);

module.exports = usersRouter;
