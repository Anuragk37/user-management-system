import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isUserAuthenticated : null, 
   userAccess : null,
   userRefresh : null,
   isAdminAuthenticated : null, 
   adminAccess : null,
   adminRefresh : null, 
}

const authSlice =createSlice({
   name:"auth",
   initialState,
   reducers:{
      userSignin:(state,action)=>{
         state.isUserAuthenticated=true,
         state.userAccess=action.payload.access
         state.userRefresh=action.payload.refresh
      },
      userSignout:(state)=>{
         state.isUserAuthenticated=false,
         state.userAccess=null
         state.userRefresh=null
      },
      adminSignin:(state,action)=>{
         state.isAdminAuthenticated=true,
         state.adminAccess=action.payload.access
         state.adminRefresh=action.payload.refresh
      },
      adminSignout:(state)=>{
         state.isAdminAuthenticated=false,
         state.adminAccess=null
         state.adminRefresh=null
      },
   }
})

export const{userSignin,userSignout,adminSignin,adminSignout}=authSlice.actions
export default authSlice.reducer