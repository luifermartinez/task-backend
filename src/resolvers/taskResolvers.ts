import { getBearerToken } from "./../utils";
import TaskServices from "../services/task.services";
import { CreateTaskInput, UpdateTaskInput } from "./../inputs/tasksInput";

const taskServices = new TaskServices();

// tasks query resolvers
export const taskQueryResolvers = {
  getAllTasks: async (_: any, args: { input: any }, ctx: any) => {
    const Input = {
      ...args.input,
      token: getBearerToken(ctx),
    };
    const data = await taskServices.getAllTasks(Input);
    if (!data) throw new Error("Error getting tasks");
    return data;
  },
};

// tasks mutation resolvers
export const taskMutationResolvers = {
  async createTask(_: any, args: any, ctx: any) {
    const input: CreateTaskInput = {
      token: getBearerToken(ctx),
      content: args.content,
    };
    const data = await taskServices.createTask(input);
    if (!data) throw new Error("Error creating task");
    return data;
  },
  async updateTask(_: any, args: { input: any }, ctx: any) {
    const input: UpdateTaskInput = {
      token: getBearerToken(ctx),
      ...args.input,
    };
    const data = await taskServices.updateTask(input);
    if (!data) throw new Error("Error updating task");
    return data;
  },
  async deleteTask(_: any, args: any, ctx: any) {
    const input: any = {
      token: getBearerToken(ctx),
      id: args.id,
    };
    const data = await taskServices.deleteTask(input);
    if (!data) throw new Error("Error deleting task");
    return data;
  },
};
