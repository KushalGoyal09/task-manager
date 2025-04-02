import { Router } from "express";
import type { Response, Request } from "express";
import { login as loginController } from "../../controllers/login";
import { z } from "zod";
import { tryCatchWrapper } from "../../utils/tryCatchWrapper";
const loginRouter = Router();

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
      data: null,
    });
    return;
  }
  const { username, password } = parsed.data;
  const { data, error } = await tryCatchWrapper(
    loginController(username, password)
  );
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

loginRouter.post("/login", login);

export default loginRouter;