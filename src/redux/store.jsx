import {configureStore} from "@reduxjs/toolkit";
import AuthenticateReducer from "./AuthenticateReducer";

const store = configureStore({
   reducer:{
       authenticate:AuthenticateReducer
   }
});

export default store;