/* eslint-disable comma-dangle */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const isURL = require("validator/lib/isURL");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorer",
    },
    avatar: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: "avatar must be a URL",
      },
      default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "invlaid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false,
    },
  },
  { versionKey: false }
);

// add custom method to userSchema with statics property
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      //  this — the User model
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      // comparing the submitted password and hash from the database
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
