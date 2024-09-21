import { UserModel } from "../Models/UserModel.js";
import {ApiError} from "../Helpers/Common/ApiError.js"
import jwt from "jsonwebtoken"
import { asynchandler } from "../Helpers/Common/Asynchandler.js";
export const authmiddleware=asynchandler(async(req,res,next)=>{
    const token=req.cookies?.Accesstoken || req.header("Authorization")?.replace("Bearer ", "");
    console.log();
    
    if(!token){
        throw new ApiError(400,"Unauthorized Request")
    }
    const decodedtoken=jwt.verify(token,process.env.JWT_SECRET);
    const user=await UserModel.findById(decodedtoken?._id);
    if(!user){
        throw new ApiError(400,"invalid access token");
    }
    req.user=user;
    next()
})