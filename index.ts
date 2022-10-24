import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import dbConnection from "./database/config";
import { graphqlHTTP } from "express-graphql";
import schema from "./src/schema";
import env_variables from "./env_variables";

/* Creating a server and listening to the port. */
/* Also configuring graphql and the mongodb connection */

const app: Express = express();
const port = env_variables.PORT;

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
/* 
dbConnection()
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
 */