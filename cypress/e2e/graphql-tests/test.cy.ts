import env_variables from "../../../env_variables";

const url = env_variables.BACKEND_URL;

// this test need to be run with the backend running

describe("Sign In Test", () => {
  it("shoud return user and token", () => {
    cy.request({
      url: `${url}/graphql`,
      method: "POST",
      body: {
        query: `query login($input: LoginInput!){ login(input: $input){ token user { email name createdAt } } }`,
        variables: {
          input: {
            email: "thelm@hotmail.es",
            password: "12345678",
          },
        },
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error("Error in the request");
      }
      if (res.body.data.errors) {
        throw new Error(res.body.data.errors[0].message);
      }
      expect(res.body.data.login.token).to.be.a("string");
      expect(res.body.data.login.user).to.be.an("object");
    });
  });
});
