import { createSlice } from "@reduxjs/toolkit";
import auth from '../appwrite/auth';

const initialState={
    status:false,
    userData:null
}

const authslice=createSlice({
    name:'authslice',
    initialState,
    reducers:{

        login:(state,action)=>{
            state.status=true
            state.userData=action.payload

        },
        logout:(state)=>{
            state.status=false,
            state.userData=null
        }
    }

})

export const checkAuthSession = () => async (dispatch) => {
    try {
        const user = await auth.getUser(); // Fetch user from Appwrite
        if (user) {
            dispatch(login(user));  // Restore session
        } else {
            dispatch(logout());  // No session, ensure logout
        }
    } catch (error) {
        console.error("Error checking session:", error);
    }
};

export const {login, logout} =authslice.actions
export default authslice.reducer
