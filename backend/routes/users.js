const usersRouter = require("express").Router();
const {
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

usersRouter.get("/:id", getUser);
usersRouter.get("/", getUsers);
usersRouter.patch("/me", updateProfile);
usersRouter.patch("/me/avatar", updateAvatar);

module.exports = usersRouter;
