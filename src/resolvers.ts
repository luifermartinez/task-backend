import {
  authMutationResolvers,
  authQueryResolvers,
} from "./resolvers/authResolvers";
import {
  taskMutationResolvers,
  taskQueryResolvers,
} from "./resolvers/taskResolvers";

// defining the resolvers for the graphql schema

export const resolvers = {
  Mutation: {
    ...authMutationResolvers,
    ...taskMutationResolvers,
  },
  Query: {
    ...authQueryResolvers,
    ...taskQueryResolvers,
  },
};
