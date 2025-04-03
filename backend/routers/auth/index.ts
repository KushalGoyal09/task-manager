import { Router } from "express";
const authRouter = Router();
import registerRouter from "./register";
import loginRouter from "./login";
import meRouter from "./me";

authRouter.use(registerRouter);
authRouter.use(loginRouter);
authRouter.use(meRouter);

export default authRouter;
