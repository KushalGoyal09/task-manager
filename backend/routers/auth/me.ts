import { Router } from "express";
import type { Response } from "express";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
import type { AuthRequest } from "../../types";
import { getMe } from "../../controllers/me";
import authMiddleware from "../../middleware/auth";
const meRouter = Router();

const me = async (req: AuthRequest, res: Response) => {
  console.log("me");
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
    return;
  }
  const { data, error } = await tryCatchWrapper(getMe(userId));
  if (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      data: null,
    });
    return;
  }
  const statusCode = data.success ? 200 : 401;
  res.status(statusCode).json(data);
};

meRouter.get("/me", authMiddleware, me);

export default meRouter;
