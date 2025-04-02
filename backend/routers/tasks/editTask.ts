import { Router } from "express";
import type { Response } from "express";
import type { AuthRequest } from "../../types";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import authMiddleware from "../../middleware/auth";
import { z } from "zod";
import { editTask } from "../../controllers/editTask";
const taskEditRouter = Router();

const editTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  status: z.boolean().default(false),
});

const updateTask = async (req: AuthRequest<{ id: string }>, res: Response) => {
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
  const parsed = editTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      data: null,
    });
    return;
  }

  const { data, error } = await tryCatchWrapper(
    editTask(parsed.data, req.userId, req.params.id)
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

taskEditRouter.put("/:id", authMiddleware, updateTask);

export default taskEditRouter;
