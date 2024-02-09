import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface RoleState {
    value : string
}
export const roleSlice = createSlice({
    name : 'roleReducer',
    initialState :{
        value: ''
    },
    reducers:{
        updateRole : (state,action : PayloadAction<string>)=>{
            state.value = action.payload
        }
    }
})
export const selectRole = (state:any) => state.role.value
export const {updateRole} = roleSlice.actions;
export default roleSlice.reducer;