import { createSlice } from "@reduxjs/toolkit";
import { LogInUser } from "../thunks/user.thunks";

const initialState = {
  user: {
    data:[],
    error:false
  },
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
      
      if(action.payload.data){
       // console.log(action.payload);
      state.user = action.payload.data;
      state.error = false
      
      }else{
        console.log('no user');
        state.error = true 
      }
      state.loading = false;
      
    });
  },
});

export default userSlice.reducer;
