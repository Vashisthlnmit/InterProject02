import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";
import toast from "react-hot-toast";

// Use conditional access to localStorage for initial state
const initialState = {
    isloggedin: false,
    data: {},
};

// This runs only on the client side (in the browser)
if (typeof window !== "undefined") {
    initialState.isloggedin = localStorage.getItem("isloggedin") || false;
    initialState.data = JSON.parse(localStorage.getItem("data")) || {};
}

export const createaccount = createAsyncThunk('/signup', async (data) => {
    console.log(data);
    try {
        const response = axiosInstance.post('auth/signup', data);
        toast.promise(response, {
            loading: "wait creating the account",
            success: "your account has been created successfully. OTP sent to your email, please verify it.",
            error: (err) => err?.message,
        });
        const resp = await response;
        console.log(resp);
        return resp;
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
    }
});

export const Verify = createAsyncThunk('/verify', async (data) => {
    console.log(data);
    try {
        const response = axiosInstance.post('auth/verify', data);
        toast.promise(response, {
            loading: "wait while verifying the account",
            success: "account verified successfully",
            error: (err) => err?.message,
        });
        const resp = await response;
        return resp;
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
    }
});

export const authin = createAsyncThunk('/signin', async (data) => {
    console.log(data);
    try {
        const response = axiosInstance.post('auth/signin', data);
        toast.promise(response, {
            loading: "wait signing in the account",
            success: "user signed in successfully",
            error: (err) => err?.message,
        });
        const resp = await response;
        return resp;
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
    }
});

export const logout = createAsyncThunk('/logout', async () => {
    try {
        const response = axiosInstance.post('auth/logout');
        toast.promise(response, {
            loading: "wait logging out user",
            success: "user logged out successfully",
            error: (err) => err?.message,
        });
        const resp = await response;
        return resp;
    } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message);
    }
});

const authoptions = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(authin.fulfilled, (state, action) => {
                if (typeof window !== "undefined") {
                    localStorage.setItem("isloggedin", action?.payload?.data?.success);
                    localStorage.setItem("data", JSON.stringify(action?.payload?.data?.data));
                }
                state.isloggedin = true;
                state.data = action.payload.data.data;
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("isloggedin");
                    localStorage.removeItem("data");
                }
                state.isloggedin = false;
                state.data = {};
            });
    },
});

export default authoptions.reducer;
