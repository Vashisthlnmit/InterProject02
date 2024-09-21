import { app } from "./app.js";
import { DBConnect } from "./Helpers/Database/Connection.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
function StartServer(){
    app.listen(process.env.PORT,()=>{
        console.log("the server has started successfully");
    })
}
DBConnect()
.then(()=>{
    StartServer();
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
})