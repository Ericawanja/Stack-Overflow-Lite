import { createSlice } from "@reduxjs/toolkit";
import { LogInUser } from "../thunks/user.thunks";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LogInUser.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(LogInUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.loadig = false;
    });
  },
});

export default userSlice.reducer;
