const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");
const fixtures = require("../fixtures");

const MONGO_URL = "mongodb://localhost:27017/aroundb";

const request = supertest(app);

beforeAll(() => {
  // connecting to the database
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

afterAll(() => {
  // disconnecting from the database
  return mongoose.disconnect();
});

describe("Testing the app endpoints", () => {
  it('GET "/" must return "Hello, world!" and a correct status', () =>
    request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    }));

  it('POST "/users" must return correct user data in JSON format and a correct status', () =>
    request.post("/users").then((response) => {
      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch("application/json");
      expect(response.body.message).toBe("success");
      expect(response.body.data.isDeveloper).toBeTruthy();
      expect(response.body.data.followersOnGithub).toBeGreaterThan(10);
    }));
});

describe("Database tests", () => {
  beforeEach(() => {
    // before each test, add the needed test data to the database
    const { name, about, avatar, email, password } = fixtures.user;

    return User.create({
      name,
      about,
      avatar,
      email,
      password,
    });
  });

  // after each test, remove the data from the database
  afterEach(() => User.deleteOne({ email: fixtures.user.email }));

  test("The user must be complete", () => {
    return User.findOne({ email: fixtures.user.email }).then((user) => {
      expect(user).toBeDefined();
      expect(user.email).toBe(fixtures.user.email);
      expect(user.name).toBe(fixtures.user.name);
    });
  });
});
