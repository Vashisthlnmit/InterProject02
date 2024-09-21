import Router from "express"
import {AddTask,UpdateTask,DeleteTask,GetAllTask} from "../Controller/Task_Controller.js"
import { authmiddleware } from "../Middleware/AuthMiddleware.js"
const TaskRouter=Router()
TaskRouter.post("/addTask",authmiddleware,AddTask)
TaskRouter.patch("/UpdateTask/:taskid",authmiddleware,UpdateTask)
TaskRouter.delete("/DeleteTask/:taskid",authmiddleware,DeleteTask)
TaskRouter.get("/getallTask",authmiddleware,GetAllTask)
export {TaskRouter}