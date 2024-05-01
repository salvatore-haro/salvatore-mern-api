const request = require("supertest");
const app = require("../src/app");
const db = require("./db");
const { userReader, userCreator } = require("./mocks/users");

const agent = request.agent(app);

beforeAll(async () => await db.connect());
afterAll(async () => await db.close());

describe("POST /api/users", () => {
  test("It should create a new user", (done) => {
    agent
      .post("/api/users")
      .send(userReader)
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /api/users", () => {
  test("It should not allow creating user with username taken", (done) => {
    agent
      .post("/api/users")
      .send({ ...userReader, password: "Password1" })
      .then((response) => {
        expect(response.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /api/auth/login", () => {
  test("It should login a user", (done) => {
    agent
      .post("/api/auth/login")
      .send({ username: userReader.username, password: userReader.password })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("token", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /api/auth/login", () => {
  test("It should not authenticate an uncreated user", (done) => {
    agent
      .post("/api/auth/login")
      .send({ username: userCreator.username, password: userCreator.password })
      .then((response) => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
