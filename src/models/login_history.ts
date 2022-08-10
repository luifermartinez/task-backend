import { Schema, model } from "mongoose";
import User, { IUser } from "./user";

/* Defining the interface for the LoginHistory model. */
export interface ILoginHistory {
  user: IUser;
  token: string;
  createdAt: Date;
}

/* Defining the schema for the LoginHistory model. */
const LoginHistorySchema = new Schema<ILoginHistory>({
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User },
  createdAt: { type: Date, default: Date.now },
});

const LoginHistory = model<ILoginHistory>("LoginHistory", LoginHistorySchema);

export default LoginHistory;
