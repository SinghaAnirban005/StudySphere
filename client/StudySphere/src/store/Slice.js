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
                state.userData.groups = [...state.userData.groups, action.payload]
            }

        },
        delGroup: (state, action) => {
            
            if(state.status == true) {
                state.userData.groups = state.userData.groups.filter(
                    (grp) => action.payload.toString() !== grp.toString()
                )
            }

            console.log(state.userData.groups)

        },
        updateUser: (state, action) => {
            state.userData = action.payload
        }
     }
})

export const { login, logout, groups, delGroup, updateUser } = slice.actions;

export default slice.reducer;