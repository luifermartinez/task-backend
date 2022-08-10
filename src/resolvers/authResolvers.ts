import { getBearerToken } from "./../utils";
import { LoginInput, RegisterInput } from "../inputs/authInputs";
import AuthServices from "../services/auth.services";

const authServices = new AuthServices();

// auth query resolvers
export const authQueryResolvers = {
  login: async (_: any, args: { input: LoginInput }) => {
    const data = await authServices.login(args.input);
    if (!data) throw new Error("Error logging in");
    return data;
  },
  getUser: async (_: any, args: { token: string }) => {
    const data = await authServices.getUser(args.token);
    if (!data) throw new Error("Invalid token");
    return data;
  },
};

// auth mutation resolvers
export const authMutationResolvers = {
  signup: async (_: any, args: { input: RegisterInput }) => {
    const data = await authServices.register(args.input);
    if (!data) throw new Error("Error creating user");
    return data;
  },
  logout: async (_: any, args: any, ctx: any) => {
    const data = await authServices.logout(getBearerToken(ctx));
    if (!data) throw new Error("Error logging out");
    return data;
  },
};
