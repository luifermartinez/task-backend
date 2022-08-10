import {
  CreateTaskInput,
  DeleteTaskInput,
  UpdateTaskInput,
} from "./../inputs/tasksInput";
import { GetAllTasksInput } from "../inputs/tasksInput";
import LoginHistory from "../models/login_history";
import Task from "../models/task";

/* Exporting the class TaskServices. */
export default class TaskServices {
  constructor() {}

  /* 
    Service to get all tasks.
    @param {GetAllTasksInput} input - The input object that contains the page, limit and status.
    @returns {GetAllTasksResponse} - The response object that contains the tasks and total.
  */
  async getAllTasks(input: GetAllTasksInput) {
    try {
      const { token, page, limit, status } = input;
      const loginHistory = await LoginHistory.findOne({ token }).populate(
        "user"
      );
      if (!loginHistory) throw new Error("Invalid token");
      const user = loginHistory.user;
      if (!user) throw new Error("Invalid token");
      const tasks = await Task.find({
        user: user._id,
        status,
      })
        .populate("user")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      const total = await Task.countDocuments({
        user: user._id,
        status,
      });

      return { tasks, total };
    } catch (error) {
      console.log(
        "🚀 ~ file: task.services.ts ~ line 25 ~ TaskServices ~ getAllTasks ~ error",
        error
      );
      throw error;
    }
  }

  /* 
    Service to create a task.
    @param {CreateTaskInput} input - The input object that contains the content
    @returns {Task} - The response object that contains the task.
  */
  async createTask(input: CreateTaskInput) {
    try {
      const { token, content } = input;
      const loginHistory = await LoginHistory.findOne({ token }).populate(
        "user"
      );
      if (!loginHistory) throw new Error("Invalid token");
      const user = loginHistory.user;
      if (!user) throw new Error("Invalid token");
      const task = new Task({ content, user: user._id });
      await (await task.save()).populate("user");
      return task;
    } catch (error) {
      console.log(
        "🚀 ~ file: task.services.ts ~ line 46 ~ TaskServices ~ createTask ~ error",
        error
      );
      throw error;
    }
  }

  /*
    Service to update a task.
    @param {UpdateTaskInput} input - The input object that contains the id, content and status.
    @returns {Task} - The response object that contains the task.
  */
  async updateTask(input: UpdateTaskInput) {
    try {
      const { token, id, status, content } = input;
      const loginHistory = await LoginHistory.findOne({ token }).populate(
        "user"
      );
      if (!loginHistory) throw new Error("Invalid token");
      const user = loginHistory.user;
      if (!user) throw new Error("Invalid token");
      const task = await Task.findOneAndUpdate(
        { _id: id, user: user._id },
        { status, content },
        { new: true }
      )
        .populate("user")
        .exec();
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      console.log(
        "🚀 ~ file: task.services.ts ~ line 66 ~ TaskServices ~ updateTask ~ error",
        error
      );
      throw error;
    }
  }

  /* 
    Service to delete a task.
    @param {DeleteTaskInput} input - The input object that contains the id.
    @returns {Boolean} - The response object that contains the boolean.
  */
  async deleteTask(input: DeleteTaskInput) {
    try {
      const { token, id } = input;
      const loginHistory = await LoginHistory.findOne({ token }).populate(
        "user"
      );
      if (!loginHistory) throw new Error("Invalid token");
      const user = loginHistory.user;
      if (!user) throw new Error("Invalid token");
      const task = await Task.findOneAndDelete({ _id: id, user: user._id });
      if (!task) throw new Error("Task not found");
      return true;
    } catch (error) {
      console.log(
        "🚀 ~ file: task.services.ts ~ line 86 ~ TaskServices ~ deleteTask ~ error",
        error
      );
      throw error;
    }
  }
}
