import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

export const LogInUser = createAsyncThunk(
  "users/getUser",
  async (payload, thunkAPI) => {
    
    const response = await UserService.LogInUser(payload);
   
    
    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }
    
    return response;
  }
);
