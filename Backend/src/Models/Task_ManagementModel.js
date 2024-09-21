import mongoose,{Schema, model} from "mongoose"
const TaskSchema=new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
    },
    Status:{
        type:String,
        required:true,
        enum:{
            values:["To Do", "In Progress", "Completed"],
            message:'{VALUE} is not supported'
        }
    },
    Priority:{
        type:String,
        required:true,
        enum:{
            values:["Low", "Medium", "High"],
            message:'{VALUE} is not supported'
        }
    },
    Due_Date:{
        type:Date,
    },
    Userid:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    }
},{timestamps:true})
export const TaskModel=model("Task_Model",TaskSchema)