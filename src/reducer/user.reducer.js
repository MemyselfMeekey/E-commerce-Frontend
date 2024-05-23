import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSvc from "../pages/auth/auth.service";

export const getLoggedInUser=createAsyncThunk(
    //api call
    "User/getLoggedInUser",
    async(data,thunkApi)=>{//this should be always async as in reducer we cannot use async
        try{
            const loggedInUser=await authSvc.getLoggedInUser()
            return loggedInUser.result
        }
        catch(exception){
            throw exception
        }
    }
)


const UserSlicer=createSlice({
    name:"User",
    initialState:{
        loggedInUser:null//loggedin user as state
    },
    reducers:{
        setHello:(state,action)=>{
            //never async
            //donot store token if you want to store then use store persist
           state.loggedInUser=action.payload
        }
    },
    extraReducers:(builder)=>{//used to bind the async reducers
        builder.addCase(getLoggedInUser.fulfilled,(state,action)=>{
            state.loggedInUser=action.payload
        })
        builder.addCase(getLoggedInUser.rejected,(state,action)=>{
            state.loggedInUser=null
        })
    }
})
export const {setHello}=UserSlicer.actions
export default UserSlicer.reducer