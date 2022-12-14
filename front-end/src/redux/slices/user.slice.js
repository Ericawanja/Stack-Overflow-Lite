import { createSlice } from "@reduxjs/toolkit";
import { LogInUser, SignupUser } from "../thunks/user.thunks";

const initialState = {
  user: {},
  error: "",
  loading: false,
  registered:false,
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
    builder.addCase(SignupUser.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(SignupUser.fulfilled, (state, action)=>{
      state.loading = false;
      state.registered = true;

    })
    builder.addCase(SignupUser.rejected, (state, action)=>{
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload.error
    })
  },
});

export default userSlice.reducer;
