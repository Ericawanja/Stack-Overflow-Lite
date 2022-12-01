import { createSlice } from "@reduxjs/toolkit";
import { fetchAllQuestions } from "../thunks/question.thunks";

const initialState = {
  questions: [],
  loading: false,
  error: ""
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // FETCH QUESTIONS CASES
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.loading = true;
      state.error = ""
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions;
      state.loading = false;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });


    // FETCH ONE QUESTION CASES
  },
});

export default questionSlice.reducer