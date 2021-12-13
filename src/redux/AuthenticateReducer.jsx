import {createSlice} from "@reduxjs/toolkit";

const initialState = {jwt:'', username:''};

export const authenticateSlicer = createSlice({
    name:'authenticate',
    initialState,
    reducers:{
        saveToken:(state,payload)=>{
            state.jwt = payload.jwt;
            state.username = payload.username;
        },
        deleteToken:(state) =>{
            state.jwt = '';
            state.username = '';
        }
    }
});


export const {saveToken, deleteToken} = authenticateSlicer.actions;
export default authenticateSlicer.reducer;