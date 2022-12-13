import { createSlice } from "@reduxjs/toolkit";
import { LogInUser } from "../thunks/user.thunks";

const initialState = {
  user: {},
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LogInUser.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(LogInUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
    });
    builder.addCase(LogInUser.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
