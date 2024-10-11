import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: {}
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload)
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = {};
        }
     }
})

export const { login, logout } = slice.actions;

export default slice.reducer;