import { createSlice } from "@reduxjs/toolkit";

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
