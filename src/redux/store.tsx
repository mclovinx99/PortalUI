import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./role.slice";

export default configureStore({
    reducer : {
        role : roleSlice
    }
});