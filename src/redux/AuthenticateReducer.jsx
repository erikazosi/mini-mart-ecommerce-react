import {createSlice} from "@reduxjs/toolkit";

const initialState = {token:'', username:'', userId:0, roles:[]};

export const authenticateSlicer = createSlice({
    name:'authenticate',
    initialState,
    reducers:{
        saveToken:(state,payload)=>{
            state.token = payload.payload.token;
            state.username = payload.payload.username;
            state.userId = payload.payload.userId;
            state.roles = payload.payload.roles;
        },
        deleteToken:(state) =>{
            state.token = '';
            state.username = '';
            state.userId = '';
            state.roles = '';
        }
    }
});


export const {saveToken, deleteToken} = authenticateSlicer.actions;
export default authenticateSlicer.reducer;