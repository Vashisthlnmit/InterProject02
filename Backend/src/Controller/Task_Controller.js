import { TaskModel } from "../Models/Task_ManagementModel.js";
import { asynchandler } from "../Helpers/Common/Asynchandler.js";
import { ApiError } from "../Helpers/Common/ApiError.js";
import { ApiResponse } from "../Helpers/Common/ApiResponse.js";
export const AddTask=asynchandler(async(req,res,next)=>{
    const {Title,Description,Status,Priority,Due_Date}=req.body
    //console.log(Title,Status,Priority);
    if(!Title || !Status || !Priority){
        throw new ApiError(400,"Please fill all the fields")
    }
    const createTask=await TaskModel.create({
        Title:Title,
        Description : Description==null ? null : Description,
        Status : Status,
        Priority : Priority,
        Due_Date : Due_Date==null ? null : Due_Date,
        Userid : req.user._id,
    })
    return res.json(new ApiResponse(201,true,"Task Added Successfully",createTask))

})
export const DeleteTask=asynchandler(async(req,res,next)=>{
    const {taskid}=req.params;
    if(!taskid){
        throw new ApiError(400,"taskid is required")
    }
    const task=await TaskModel.findById(taskid);
    if(!task){
        throw new ApiError(404,"Task not found")
    }
    const checkuser=task.Userid._id.equals(req.user._id);
    if(!checkuser){
        throw new ApiError(403,"You are not authorized to this deletion");
    }
    const delete_task=await TaskModel.findByIdAndDelete(task._id);
    return res.json(new ApiResponse(200,true,"Task deleted successfully",delete_task))
})
export const UpdateTask=asynchandler(async(req,res,next)=>{
    const {taskid}=req.params;
    const {Title,Description,Status,Priority,Due_Date}=req.body;
    const task=await TaskModel.findById(taskid);
    if(!task){
        throw new ApiError(404,"Task not found")
    }
    const checkuser=task.Userid._id.equals(req.user._id);
    if(!checkuser){
        throw new ApiError(403,"You are not authorized to this updation");
    }
    const UpdatedTask=await TaskModel.findByIdAndUpdate(taskid,{
        $set:{
            Title : Title==null ? task.Title : Title,
            Description : Description==null ? task.Description : Description,
            Status : Status==null? task.Status : Status,
            Priority : Priority==null? task.Priority : Priority,
            Due_Date : Due_Date==null? task.Due_Date : Due_Date
        }
    },{new:true})
    return res.json(new ApiResponse(200,true,"Task Updated successfully",UpdatedTask))
})
export const GetAllTask=asynchandler(async(req,res,next)=>{
    const tasks=await TaskModel.find({Userid:req.user._id});
    return res.json(new ApiResponse(200,true,"Tasks fetched successfully",tasks))
})
