import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

const DB = process.env.DB_HOST;
const loginData = {
  email: "yura@gmail.com",
  password: "12345678",
};

describe("test /users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("the response must have a status code of 200", async () => {
    const result = await request(app).post("/users/login").send(loginData);

    expect(result.status).toBe(200);
  });
  test("the response must return a token", async () => {
    const result = await request(app).post("/users/login").send(loginData);

    expect(result.body.token).toBeDefined();
  });
  test("the response must return object with 2 fields email and subscription with the String data type", async () => {
    const result = await request(app).post("/users/login").send(loginData);

    expect(result).toBeDefined();
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
