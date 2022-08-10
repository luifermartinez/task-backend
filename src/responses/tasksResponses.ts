import { ITask } from "./../models/task";

/* Defining the interface for the response object. */
export interface GetAllTasksResponse {
  tasks: ITask[];
  total: number;
}
