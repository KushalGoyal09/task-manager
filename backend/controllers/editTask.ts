import { PrismaClient } from "@prisma/client";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";
import type { Response, Task } from "../types";
const db = new PrismaClient();

export const editTask = async (
  task: Task,
  userId: string
): Promise<Response<Task>> => {
  const { data, error } = await tryCatchWrapper(
    db.task.update({
      where: {
        id: task.id,
        userId: userId,
      },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
      },
    })
  );
  if (error) {
    return {
      success: false,
      message: "Failed to edit task",
      data: null,
    };
  }
  return {
    success: true,
    message: "Task edited successfully",
    data: data,
  };
};
