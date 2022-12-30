import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";
import { fetchAllQuestions } from "./question.thunks";

export const LogInUser = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    const response = await UserService.LogInUser(payload);
    if (!!response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }
   
    thunkAPI.dispatch(fetchAllQuestions({limit:5, page:1}))
   
    return { data: response.data };
  }
);

export const GetLoggedUser = createAsyncThunk(
  "users/me",
  async (_, thunkAPI) => {
    const response = await UserService.GetLoggedUser();
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
