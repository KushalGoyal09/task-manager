import { PrismaClient } from "@prisma/client";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";
import type { Response, Task } from "../types";
const db = new PrismaClient();

export const addTask = async (
  task: Task,
  userId: string
): Promise<Response<Task>> => {
  const { data, error } = await tryCatchWrapper(
    db.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        userId: userId,
      },
    })
  );
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
