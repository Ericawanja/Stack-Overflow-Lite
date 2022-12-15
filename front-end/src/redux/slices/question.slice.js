import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllQuestions,
  fetchOneQuestions,
  getUsersQuestions,
  searchQuestions,
} from "../thunks/question.thunks";

const initialState = {
  questions: [],
  question: {},
  searchedQuestions: [],
  searching: false,
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
      state.searching = false;
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions.questions;
      state.loading = false;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    //FETCHONEQUESTION
    builder.addCase(fetchOneQuestions.pending, (state, action) => {
      state.searching = false;
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchOneQuestions.fulfilled, (state, action) => {
      state.question = action.payload.question;
      state.loading = false;
      state.searching = false;
    });
    builder.addCase(fetchOneQuestions.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.searching = false;
    });

    //SEARCH QUESTIONS
    builder.addCase(searchQuestions.pending, (state, action) => {
      state.searching = true;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(searchQuestions.fulfilled, (state, action) => {
      state.searchedQuestions = action.payload.question.questions;
      state.loading = false;
    });
    builder.addCase(searchQuestions.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    // USER QUESTIONS
    builder.addCase(getUsersQuestions.pending, (state, action) => {
      state.searching = false;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUsersQuestions.fulfilled, (state,action)=>{
      state.searching = false
      console.log(action.payload);
      state.questions = action.payload.question.questions;
      state.loading = false;
    })

  },
});

export default questionSlice.reducer;
