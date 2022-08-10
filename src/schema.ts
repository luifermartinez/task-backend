import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";

// define the graphql schema

const typeDefs = `

scalar Date

type Query {
    login(input: LoginInput!): LoginResponse
    getUser(token: String!): User
    getAllTasks(input: GetAllTasksInput!): GetAllTasksResponse
}

type Mutation {
    signup(input: RegisterInput!): User
    logout: Boolean
    createTask(content: String!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: String!): Boolean
}

type LoginResponse {
    token: String
    user: User
}

type GetAllTasksResponse {
    tasks: [Task]
    total: Int
}

type User {
    name: String
    email: String
    password: String
    createdAt: Date
}

type Task {
    _id: ID
    content: String
    user: User
    createdAt: Date
    updatedAt: Date
    status: Int
}

input RegisterInput {
    email: String!
    name: String!
    password: String!
}

input LoginInput {
    email: String!
    password: String!
}

input GetAllTasksInput {
    page: Int!
    limit: Int!
    status: Int!
}

input UpdateTaskInput {
  id: ID!
  content: String!
  status: Int!
}

`;

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
