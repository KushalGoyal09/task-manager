import { Router } from "express";
const taskRouter = Router();
import deleteTask from "./deleteTask";
import getTasks from "./getTasks";
import postTask from "./postTask";
import taskEdit from "./editTask";

taskRouter.use(deleteTask);
taskRouter.use(getTasks);
taskRouter.use(postTask);
taskRouter.use(taskEdit);

export default taskRouter;
