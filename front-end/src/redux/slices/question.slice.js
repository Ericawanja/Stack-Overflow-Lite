import { createSlice } from "@reduxjs/toolkit";
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
  fetchAllQuestions,
  fetchOneQuestions,
  getUserAnswers,
  getUserComments,
  getUsersQuestions,
  orderByAnswers,
  postAnswer,
  postComment,
  preferAnswer,
  searchQuestions,
  voteAnswer,
} from "../thunks/question.thunks";

const initialState = {
  questions: {
    data: [],
    total: 0,
    error: "",
  },
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
  ansForm: false,
  comment: false,
  commentDetails: {},

  commentError: "",
  userComments: [],
  userAnswers: [],
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
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
    closeAnsForm: (state, action) => {
      state.ansForm = false;
    },
    openAnsForm: (state, action) => {
      state.ansForm = true;
    },
    openCommentForm: (state, action) => {
      state.comment = !state.comment;
      state.commentDetails = action.payload;
    },
    closeCommentForm: (state, action) => {
      state.comment = false;
      state.commentDetails = {};
    },
  },
  extraReducers: (builder) => {
    // FETCH QUESTIONS CASES
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.loading = true;
      state.questions.error = "";
      state.searching = false;
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.questions.data = action.payload.questions.questions;
      state.questions.total = action.payload.questions.total;
      state.loading = false;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      console.log(action);
      state.questions.error = 'An error';
      state.questions.data = [];
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
      state.questions.error = "";
    });
    builder.addCase(getUsersQuestions.fulfilled, (state, action) => {
      state.searching = false;

      state.questions.data = action.payload.question.questions;
      state.loading = false;
    });
    builder.addCase(getUsersQuestions.rejected, (state, action) => {
      console.log(action);
      state.questions = { ...state.questions, error: action?.payload?.error };
      state.questions = { ...state.questions, data: [] };
      state.loading = false;
    });
    //POST QUESTION
    builder.addCase(createQuestion.pending, (state, action) => {
      state.searching = false;
      state.loading = true;
      state.error = "";
      state.editing = false;
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.searching = false; //work on this
      state.loading = false;
      state.error = "";
      state.feedBack = true;
      state.feedBackMsg = action.payload.message.message;
      state.openQForm = false;
      state.editing = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.editing = false;
    });

    //UPDATE QUESTION
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
      state.openQForm = false;
      state.editing = false;
    });
    builder.addCase(editQuestion.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

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

    //POST ANSWER
    builder.addCase(postAnswer.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.editing = false;
    });
    builder.addCase(postAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.feedBack = true;
      state.ansForm = false;
      state.feedBackMsg = action.payload.message;
      state.error = "";
      state.editing = false;
    });
    builder.addCase(postAnswer.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
      state.editing = false;
    });

    //POST COMMENT
    builder.addCase(postComment.pending, (state, action) => {
      state.loading = true;
      state.commentError = "";
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.loading = false;
      state.feedBack = true;
      state.comment = false;
      state.feedBackMsg = action.payload.message;
      state.commentError = "";
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.commentError = action.payload.error;
      state.loading = false;
    });

    //PREFER ANSWER

    builder.addCase(preferAnswer.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(preferAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.feedBack = true;
      state.feedBackMsg = action.payload.message;
    });
    builder.addCase(preferAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
      state.feedBack = true;
      state.feedBackMsg = action.payload.error.message;
    });
    // Vote answer

    builder.addCase(voteAnswer.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(voteAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.feedBack = true;
      state.feedBackMsg = action.payload.message;
    });
    builder.addCase(voteAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = "";
      state.feedBack = true;
      state.feedBackMsg = action.payload.error.message;
    });
    //order questions
    builder.addCase(orderByAnswers.pending, (state, action) => {
      state.loading = true;
      state.questions.error = "";
      state.searching = false;
    });
    builder.addCase(orderByAnswers.fulfilled, (state, action) => {
      state.questions.data = action.payload.questions;
      state.loading = false;
    });
    builder.addCase(orderByAnswers.rejected, (state, action) => {
      state.questions.error = action.payload.error;
      state.loading = false;
      state.questions.data = [];
    });

    //user answers
    builder.addCase(getUserAnswers.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.searching = false;
    });
    builder.addCase(getUserAnswers.fulfilled, (state, action) => {
      state.userAnswers = action.payload.answers;
      state.loading = false;
    });
    builder.addCase(getUserAnswers.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    //user comments
    builder.addCase(getUserComments.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.searching = false;
    });
    builder.addCase(getUserComments.fulfilled, (state, action) => {
      state.userComments = action.payload.comments;
      state.loading = false;
    });
    builder.addCase(getUserComments.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});
export const {
  closeFeedbackModal,
  openQUestionForm,
  closeQUestionForm,
  setIsEditingTrue,
  setIsEditingFalse,
  openAnsForm,
  closeAnsForm,
  openCommentForm,
  closeCommentForm,
} = questionSlice.actions;
export default questionSlice.reducer;
