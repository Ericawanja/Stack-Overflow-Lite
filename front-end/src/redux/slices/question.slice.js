import { createSlice } from "@reduxjs/toolkit";
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
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
  feedBack: false,
  feedBackMsg: "",
  openQForm: false,
  editing: false,
  questionToEdit: {},
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},

  reducers: {
    closeFeedbackModal: (state, action) => {
      state.feedBack = false;
    },
    openQUestionForm: (state, action) => {
      state.openQForm = true;
    },
    closeQUestionForm: (state, action) => {
      state.openQForm = false;
      state.error = "";
      state.questionToEdit = {};
    },
    setIsEditingTrue: (state, action) => {
      state.editing = true;
      state.openQForm = true;
      state.questionToEdit = action.payload;
    },
    setIsEditingFalse: (state, action) => {
      state.editing = false;
    },
  },
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
      console.log(action.payload.error);
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
    builder.addCase(getUsersQuestions.fulfilled, (state, action) => {
      state.searching = false;

      state.questions = action.payload.question.questions;
      state.loading = false;
    });
    builder.addCase(getUsersQuestions.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    //POST QUESTION
    builder.addCase(createQuestion.pending, (state, action) => {
      state.searching = false;
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      console.log(action.payload);
      state.searching = false; //work on this
      state.loading = false;
      state.error = "";
      state.feedBack = true;
      state.feedBackMsg = action.payload.message.message;
      state.openQForm = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
    builder.addCase(editQuestion.pending, (state, action) => {
      state.error = "";
      state.loading = true;
    });
    builder.addCase(editQuestion.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = "";
      state.loading = false;
      state.feedBack = true;
      state.feedBackMsg = action.payload.message.message;
      state.openQForm = false
    });
    builder.addCase(editQuestion.rejected, (state, action)=>{
      state.error = action.payload.error
      state.loading = false
      
    })

    //DELETE
    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.feedBackMsg = action.payload.message.message;
      state.feedBack = true;
      state.error = "";
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload.error;
      state.feedBack = true;
      state.feedBackMsg = action.payload.error.message;
    });
  },
});
export const {
  closeFeedbackModal,
  openQUestionForm,
  closeQUestionForm,
  setIsEditingTrue,
  setIsEditingFalse,
} = questionSlice.actions;
export default questionSlice.reducer;
