import { Router } from "express";
const authRouter = Router();
import registerRouter from "./register";
import loginRouter from "./login";

authRouter.use(registerRouter);
authRouter.use(loginRouter);

export default authRouter;
