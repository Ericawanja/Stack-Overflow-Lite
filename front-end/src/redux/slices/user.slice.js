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
      console.log(action.payload);
      state.user = action.payload.data;
      state.loadig = false;
    });
  },
});

export default userSlice.reducer;
