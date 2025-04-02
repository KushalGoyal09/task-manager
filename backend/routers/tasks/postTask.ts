import { Router } from "express";
import type { Response } from "express";
import type { AuthRequest } from "../../types";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import authMiddleware from "../../middleware/auth";
import { addTask } from "../../controllers/addTask";
import { z } from "zod";
const postRouter = Router();

const addTaskSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
});

const createTask = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }
  const parsed = addTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      data: null,
    });
    return;
  }

  const { data, error } = await tryCatchWrapper(
    addTask(parsed.data, req.userId)
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

postRouter.post("/", authMiddleware, createTask);

export default postRouter;
