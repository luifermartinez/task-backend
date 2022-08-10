import { Schema, model, Types } from "mongoose";
import User from "./user";

/* Defining an enum of taskStatus. */
export enum TaskStatus {
  LIVE,
  DONE,
  ARCHIVED,
}

/* Defining the interface of the Task model. */
export interface ITask {
  _id: Types.ObjectId;
  user: typeof User;
  content: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

/* Defining the schema of the Task model. */
const TaskSchema = new Schema<ITask>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User },
  createdAt: { type: Date, default: Date.now },
  status: { type: "number", default: TaskStatus.LIVE, enum: TaskStatus },
  updatedAt: { type: Date, default: Date.now },
});

const Task = model<ITask>("Task", TaskSchema);

export default Task;
