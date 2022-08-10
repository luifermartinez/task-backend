import mongoose from "mongoose";
import env_variables from "../env_variables";

/**
 * This function connects to MongoDB and returns true if the connection is successful, otherwise it
 * throws an error.
 * @returns A promise.
 */
const dbConnection = async () => {
  try {
    mongoose.connect(env_variables.MONGODB_URL);
    console.log("🚀 MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("🔥 Error connecting to MongoDB");
  }
};

export default dbConnection;
