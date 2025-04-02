import { PrismaClient } from "@prisma/client";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";
import type { Response, Task } from "../types";
const db = new PrismaClient();

export const getAllTasks = async (
  userId: string
): Promise<Response<Task[]>> => {
  const { data, error } = await tryCatchWrapper(db.task.findMany());
  if (error) {
    return {
      success: false,
      message: "Failed to add task",
      data: null,
    };
  }
  return {
    success: true,
    message: "Task added successfully",
    data: data,
  };
};
