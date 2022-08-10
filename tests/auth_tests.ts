import express, { Express } from "express";
import dbConnection from "../database/config";
import env_variables from "../env_variables";
import supertest from "supertest";
import { expect } from "chai";
import { graphqlHTTP } from "express-graphql";
import schema from "../src/schema";
import User from "../src/models/user";

const url = env_variables.BACKEND_URL;
const request = supertest(url);

before(function (done) {
  const app: Express = express();
  const port = env_variables.PORT;

  app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema,
    })
  );

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });

  dbConnection().then(() => done());
});

describe("Auth flow using graphql", () => {
  before(async () => {
    const user = await User.findOne({ email: "exampleEmail@mail.com" });
    if (user) await user.remove();
  });

  describe("sign up", () => {
    it("should create a new user", (done) => {
      request
        .post("/graphql")
        .send({
          query: `mutation signup($input: RegisterInput!){ signup(input: $input){ name email password createdAt } }`,
          variables: {
            input: {
              email: "exampleEmail@mail.com",
              name: "exampleName",
              password: "12345678",
            },
          },
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.errors)
            return done(new Error(res.body.errors[0].message));
          expect(res.body.data.signup).to.be.an("object");
          expect(res.body.data.signup.name).to.be.equal("exampleName");
          expect(res.body.data.signup.email).to.be.equal(
            "exampleEmail@mail.com"
          );
          done();
        });
    });
  });

  describe("signIn", () => {
    it("should return an user and a token", (done) => {
      request
        .post("/graphql")
        .send({
          query: `query login($input: LoginInput!){ login(input: $input){ token user { email name createdAt } } }`,
          variables: {
            input: {
              email: "exampleEmail@mail.com",
              password: "12345678",
            },
          },
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.errors)
            return done(new Error(res.body.errors[0].message));
          expect(res.body.data.login.user).to.be.an("object");
          expect(res.body.data.login.token).to.be.a("string");
          done();
        });
    });
  });
});
