import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user.service";

export const LogInUser = createAsyncThunk(
  "users/getUser",
  async (payload, thunkAPI) => {
    const response = await userService.LogInUser();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }
    return { question: response.data };
  }
);
