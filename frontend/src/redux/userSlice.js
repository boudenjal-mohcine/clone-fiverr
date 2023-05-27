import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/userAPI";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const response = await login(userCredentials);
        localStorage.setItem('user', JSON.stringify(response));
        console.log("====="+response);
        return response;
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = ' Access Denied! Invalid Credentials';
                }
                else {
                    state.error = action.error.message;
                }
            })


    }
});
export default userSlice.reducer;