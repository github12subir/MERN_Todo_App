import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authAPI";

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await registerUser(data);
  return res.data;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await loginUser(data);
  localStorage.setItem("token", res.data.token);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;