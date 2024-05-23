import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user.reducer";


//state maintain, reducer maintain


//storage of reducer
const store=configureStore({
    reducer:{
        user:userReducer
    }
    
})
export default store