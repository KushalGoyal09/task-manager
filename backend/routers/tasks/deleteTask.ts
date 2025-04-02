import { Router } from "express";
import type { Response } from "express";
import type { AuthRequest } from "../../types";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import authMiddleware from "../../middleware/auth";
import { deleteTask as deleteTaskController } from "../../controllers/deleteTask";
const deleteRouter = Router();

const deleteTask = async (req: AuthRequest<{ id: string }>, res: Response) => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }
  const taskId = req.params.id;
  if (!taskId) {
    res.status(400).json({
      success: false,
      message: "Invalid task id",
      data: null,
    });
    return;
  }

  const { data, error } = await tryCatchWrapper(
    deleteTaskController(req.params.id, req.userId)
  );
  if (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tasks",
      data: null,
    });
    return;
  }
  const statusCode = data.success ? 200 : 400;
  res.status(statusCode).json(data);
};

deleteRouter.delete("/:id", authMiddleware, deleteTask);

export default deleteRouter;
