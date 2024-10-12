import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: {},
    userGroups: []
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = {};
            state.userGroups=[]
        },
        groups: (state, action) => {
          
            if(state.status == true){
                state.userGroups = [...action.payload]
            }

            console.log(JSON.stringify(state.userGroups))
        },
        delGroup: (state, action) => {
            if(state.status == true) {
                console.log(action.payload[0])
            }
        }
     }
})

export const { login, logout, groups, delGroup } = slice.actions;

export default slice.reducer;