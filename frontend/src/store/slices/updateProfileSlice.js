import {createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false
    },
    reducers: {
        updateProfileRequest(state, action){
            state.loading = true;
        },
        updateProfileSuccess(state, action){
            state.error = null;
            state.loading = false;
            state.isUpdated = true;
        },
        updateProfileFailed(state, action){
            state.error = action.payload;
            state.loading = false;
            state.isUpdated = false;
        },
        updatePasswordRequest(state, action){
            state.loading = true;
        },
        updatePasswordSuccess(state, action){
            state.error = null;
            state.loading = false;
            state.isUpdated = true;
        },
        updatePasswordFailed(state, action){
            state.error = action.payload;
            state.loading = false;
            state.isUpdated = false;
        },
        profileResetAfterUpdate(state, action){
            state.error = null;
            state.isUpdated = false;
            state.loading = false;
        }
    }
})

export const updateProfile = (data) => async (dispatch) => {
    dispatch(updateProfileSlice.actions.updateProfileRequest());
    try{
        const response = await axios.put("http://localhost:4000/api/v1/user/update/profile", data, {
            withCredentials: true,
            headers: {"Content-Type": "multipart/form-data"}
        });
        dispatch(updateProfileSlice.actions.updateProfileSuccess());
    }
    catch(error){
        console.log(error);
        dispatch(updateProfileSlice.actions.updateProfileFailed(error.response.data.message || "Failed To Update Profile"            
        ));
    }
};

export const updatePassword = (data) => async (dispatch) => {
    dispatch(updateProfileSlice.actions.updatePasswordRequest());
    try{
        const response = await axios.put(
            "http://localhost:4000/api/v1/user/update/password", 
            data, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        });
        dispatch(updateProfileSlice.actions.updatePasswordSuccess());
    }
    catch(error){
        console.log(error);
        dispatch(
            updateProfileSlice.actions.updatePasswordFailed(
                error.response.data.message || "Failed To Update Password."            
        ));
    }
};

export const clearAllUpdateProfileErrors = ()=>(dispatch)=>{
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate())
}

export default updateProfileSlice.reducer;