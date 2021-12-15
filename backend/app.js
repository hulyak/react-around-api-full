/* eslint-disable comma-dangle */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit"); // rate-limiting middleware for Express
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { auth } = require("./middlewares/auth");
const users = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const NotFoundError = require("./errors/not-found-err");

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors());
app.options("*", cors()); // enable requests for all routes

app.use(helmet());

app.use(requestLogger); // enabling the request logger

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
      })
      .unknown(true),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
      })
      .unknown(true),
  }),
  createUser
);

// authorization
app.use(auth);
// some routes don't require auth
// for example, register and login
app.use("/users", users);
// these routes need auth
app.use("/cards", require("./routes/cards"));

app.get("*", () => {
  throw new NotFoundError("Requested resource not found");
});

// enabling the error logger
app.use(errorLogger);
// celebrate errors middleware
app.use(errors());

// centralized error handler
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;
//   res.status(statusCode).send({
//     // check the status and display a message based on it
//     message: statusCode === 500 ? "An error occurred on the server" : message,
//   });
//   next(new Error(message));
// });

app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  if (err.name === "ValidationError") statusCode = 400;
  else if (err.name === "MongoError" && err.code === 11000) statusCode = 409;
  else if (err.name === "Error") statusCode = 401;

  const { message = "An error occurred on the server" } = err;

  res.status(statusCode).send({ message });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}
