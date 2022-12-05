import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllQuestions,
  fetchOneQuestions,
} from "../thunks/question.thunks";

const initialState = {
  questions: [],
  question:{},
  loading: false,
  error: "",
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH QUESTIONS CASES
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions;
      state.loading = false;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      // console.log(action.payload, 'error');
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(fetchOneQuestions.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchOneQuestions.fulfilled, (state, action) => {
      
      state.question = action.payload.question;
      state.loading = false;
    });
    builder.addCase(fetchOneQuestions.rejected, (state, action) => {
      // console.log(action.payload, 'error');
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export default questionSlice.reducer;
