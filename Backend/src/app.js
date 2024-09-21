import express,{urlencoded} from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express();
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://inter-project02.vercel.app",
    credentials:true
}))

// Router
import { authRouter } from "./Router/UserAuthRouter.js";
import { TaskRouter } from "./Router/TaskManageRouter.js";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task",TaskRouter)
export {app}