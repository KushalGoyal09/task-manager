import { Router } from "express";
const router = Router();
import tasksRouter from "./tasks";
import authRouter from "./auth";

router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);

export default router;
