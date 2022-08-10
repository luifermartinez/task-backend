import { TaskStatus } from "../models/task";

/* Defining the input for the GetAllTasks function. */
export interface GetAllTasksInput {
  token: string;
  status: TaskStatus;
  page: number;
  limit: number;
}

/* Defining the input for the CreateTask function. */
export interface CreateTaskInput {
  token: string;
  content: string;
}

/* Defining the input for the UpdateTask function. */
export interface UpdateTaskInput {
  token: string;
  id: string;
  content: string;
  status: TaskStatus;
}

/* Defining the input for the DeleteTask function. */
export interface DeleteTaskInput {
  token: string;
  id: string;
}
