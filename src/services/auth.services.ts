import User from "../models/user";
import LoginHistory from "../models/login_history";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginInput, RegisterInput } from "../inputs/authInputs";
import env from "../../env_variables";

const JWT_SECRET = env.JWT_SECRET;

export default class AuthServices {
  constructor() {}

  /* 
    Service to login.
    @param {LoginInput} input - The input object that contains the email and password.
    @returns {LoginResponse} - The response object that contains the token and user.
  */
  async login(input: LoginInput) {
    try {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Password or email is incorrect");
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const loginHistory = new LoginHistory({
        user: user._id,
        token,
      });
      await loginHistory.save();
      return {
        token,
        user,
      };
    } catch (error) {
      console.log(
        "🚀 ~ file: auth.services.ts ~ line 28 ~ AuthServices ~ login ~ error",
        error
      );
      throw error;
    }
  }

  /* 
    Service to register.
    @param {RegisterInput} input - The input object that contains the email, password and name.
    @returns {RegisterResponse} - The response object that contains the user.
  */
  async register(input: RegisterInput) {
    try {
      const { email, name, password } = input;
      const user = await User.findOne({ email });
      if (user) throw new Error("User already exists");
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(
        "🚀 ~ file: auth.services.ts ~ line 48 ~ AuthServices ~ register ~ error",
        error
      );
      throw error;
    }
  }

  /* 
    Service to logout.
    @param {string} token - The token of the user.
    @returns {boolean} - The response object that contains the logout.
  */
  async logout(token: string) {
    try {
      const loginHistory = await LoginHistory.findOne({ token });
      if (!loginHistory) throw new Error("Invalid token");
      await LoginHistory.deleteOne({ token });
      return true;
    } catch (error) {
      console.log(
        "🚀 ~ file: auth.services.ts ~ line 60 ~ AuthServices ~ logout ~ error",
        error
      );
      throw error;
    }
  }

  /* 
    Service to logout.
    @param {string} token - The token of the user.
    @returns {boolean} - The response object that contains the logout.
  */
  async getUser(token: string) {
    try {
      const loginHistory = await LoginHistory.findOne({ token });
      if (!loginHistory) throw new Error("Invalid token");
      const user = await User.findById(loginHistory.user);
      return user;
    } catch (error) {
      console.log(
        "🚀 ~ file: auth.services.ts ~ line 72 ~ AuthServices ~ getUser ~ error",
        error
      );
      throw error;
    }
  }
}
