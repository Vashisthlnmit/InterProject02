import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../AxiosInstance";
import toast from "react-hot-toast"
export const AddTask=createAsyncThunk('/addtask',async(data)=>{
    console.log(data);
    try{
     const response=axiosInstance.post('task/addTask',data)
     toast.promise(response,{
        loading:"wait creating the task",
        success: "your task has created successfully",
        error:(err)=>{
            return err?.message
        }
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const GetAllTask=createAsyncThunk('/getalltask',async()=>{
    try{
     const response=axiosInstance.get('task/getallTask')
     toast.promise(response,{
        loading:"wait loading all your  task",
        success: "your task has been fetched successfully successfully",
        error:(err)=>{
            return err?.message
        }
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const UpdatedTask=createAsyncThunk('/updatetask',async(data)=>{
    console.log(data);
    try{
     const response=axiosInstance.patch(`task/UpdateTask/${data.taskid}`,data)
     toast.promise(response,{
        loading:"wait updating the task",
        success: "your task has updated  successfully",
        error:(err)=>{
            return err?.message
        }
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})
export const DeleteTask=createAsyncThunk('/deletetask',async(data)=>{
    console.log(data);
    try{
     const response=axiosInstance.delete(`task/DeleteTask/${data}`)
     toast.promise(response,{
        loading:"wait deleting your task",
        success: "your task has deleted successfully",
        error:(err)=>{
            return err?.message
        }
     })
     const resp=await response;
     console.log(resp);
     return resp;
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message)
    }
})