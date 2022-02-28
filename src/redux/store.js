import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import memberReducer from "./member";

export const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
  },
});
