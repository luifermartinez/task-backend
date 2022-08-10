import { Schema, model, Types } from "mongoose";

/* Defining the interface for the User model. */
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

/* Defining the schema for the User model. */
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model<IUser>("User", UserSchema);

export default User;
