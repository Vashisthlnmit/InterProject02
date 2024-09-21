import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./AuthenticationReducer";
const store=configureStore({
    reducer:{
        auth:AuthenticationReducer
    }
})
export default store