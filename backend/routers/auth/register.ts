import { Router } from "express";
import type { Response, Request } from "express";
import { register as registerController } from "../../controllers/register";
import { z } from "zod";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
const registerRouter = Router();

const registerSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
});

const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      data: null,
    });
    return;
  }
  const { name, username, password } = parsed.data;
  const { data, error } = await tryCatchWrapper(
    registerController(name, username, password)
  );
  if (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register",
      data: null,
    });
    return;
  }
  const statusCode = data.success ? 200 : 400;
  res.status(statusCode).json(data);
};

registerRouter.post("/register", register);

export default registerRouter;