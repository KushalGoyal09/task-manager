import { Router } from "express";
import type { Response } from "express";
import type { AuthRequest } from "../../types";
import { getAllTasks as getAllTasksController } from "../../controllers/getAllTasks";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import authMiddleware from "../../middleware/auth";
const getRouter = Router();

const getAllTasks = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }
  const { data, error } = await tryCatchWrapper(
    getAllTasksController(req.userId)
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

getRouter.get("/", authMiddleware, getAllTasks);

export default getRouter;
