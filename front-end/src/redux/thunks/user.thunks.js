import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

export const LogInUser = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    const response = await UserService.LogInUser(payload);
    if (!!response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }

    return { data: response.data };
  }
);

export const SignupUser = createAsyncThunk(
  "users/signup",
  async (payload, thunkApi) => {
    const response = await UserService.SignupUser(payload);

    if (!!response.error) {
      return thunkApi.rejectWithValue({ error: response.error });
    }
    return {data:response.data}
  }
);
