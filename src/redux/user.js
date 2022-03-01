import { createSlice } from "@reduxjs/toolkit";
import fetchWrapper from "../helpers/fetchWrapper";

const initialState = {
  token: localStorage.getItem("token") ?? null,
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      fetchWrapper.defaults.headers["x-access-token"] = action.payload.token;
      fetchWrapper.interceptors.request.use(function (config) {
        config.headers["x-access-token"] = action.payload.token;
        return config;
      });
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      state.userData = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
