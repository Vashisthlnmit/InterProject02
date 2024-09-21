import Router from "express"
import { signin,signup,verifyemail,Logout } from "../Controller/User_Controller.js"
import { authmiddleware } from "../Middleware/AuthMiddleware.js"
const authRouter=Router();
authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.post('/verify',verifyemail);
authRouter.post('/logout',authmiddleware,Logout);
export {authRouter}
