import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

export const LogInUser = createAsyncThunk(
  "users/getUser",
  async (payload, thunkAPI) => {
    console.log("user");
    const response = await UserService.LogInUser(payload);
    console.log(response);
    
    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }
    return {user:null, message:'getting user' };
  }
);
