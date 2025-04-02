import { PrismaClient } from "@prisma/client";
import { tryCatchWrapper } from "../utils/tryCatchWrapper";
import type { Response } from "../types";
const db = new PrismaClient();

export const deleteTask = async (
  taskId: string,
  userId: string
): Promise<Response<null>> => {
  const { data, error } = await tryCatchWrapper(
    db.task.delete({
      where: {
        id: taskId,
        userId,
      },
    })
  );
  if (error) {
    return {
      success: false,
      message: "Failed to delete task",
      data: null,
    };
  }
  return {
    success: true,
    message: "Task deleted successfully",
    data: null,
  };
};
