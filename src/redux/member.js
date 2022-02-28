import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membersList: [],
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.membersList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMembers } = memberSlice.actions;

export default memberSlice.reducer;
