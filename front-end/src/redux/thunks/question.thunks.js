import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuestionService } from "../../services";

// FETCH ALL QUESTIONS
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetch-all-questions",
  async (_, thunkAPI) => {
    const response = await QuestionService.GetAllQuestions();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { questions: response.data };
  }
);

// FETCH ONE QUESTION
export const fetchOneQuestions = createAsyncThunk(
  "question/fetch-one-questions",
  async (questionId, thunkAPI) => {
    const response = await QuestionService.GetOneQuestion(questionId);

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { question: response.data };
  }
);

export const searchQuestions = createAsyncThunk(
  "questions/search",
  async (searchTerm, thunkAPI) => {
    const response = await QuestionService.GetsearchedQuestions(searchTerm);

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { question: response.data };
  }
);

//FETCH USER QUESTIONS
export const getUsersQuestions = createAsyncThunk(
  "questions/user questions",
  async (_, thunkAPI) => {
    const response = await QuestionService.GetUserQuestions();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }
    return { question: response.data };
  }
);

export const createQuestion = createAsyncThunk(
  "questions/create question",
  async (questionDetails, thunkAPI) => {
    const response = await QuestionService.CreateQuestion(questionDetails);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }
    thunkAPI.dispatch(fetchAllQuestions());
    return { message: response.message };
  }
);

//edit question
export const editQuestion = createAsyncThunk(
  "questions/edit",

  async (details, thunkAPI) => {
    const response = await QuestionService.EditQuestion(details);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }
    thunkAPI.dispatch(fetchAllQuestions());
    return { message: response.message };
  }
);

//delete question
export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (question_id, thunkAPI) => {
    const response = await QuestionService.DeleteQuestion(question_id);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }

    thunkAPI.dispatch(fetchAllQuestions());
    return { message: response.data };
  }
);

export const postAnswer = createAsyncThunk(
  "questions/ add answer",
  async (answer, thunkAPI) => {
    const response = await QuestionService.AddAnswer(answer);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error.errors[0] });
    }
    console.log(answer);
    thunkAPI.dispatch(fetchOneQuestions({ question_id: answer.question_id }));
    return { message: response.data.message };
  }
);

export const postComment = createAsyncThunk(
  "questions/ add comment",
  async (param, thunkAPI) => {
    const response = await QuestionService.AddComment(param.comment);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error.errors[0] });
    }

    thunkAPI.dispatch(fetchOneQuestions({ question_id: param.question_id }));
    return { message: response.data.message };
  }
);

export const preferAnswer = createAsyncThunk(
  "questions/prefer answer",
  async (details, thunkAPI) => {
    const response = await QuestionService.PreferAnswer(details);
 
    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error});
    }
    thunkAPI.dispatch(fetchOneQuestions({ question_id: details.question_id }));
    return { message: response.data.message };
  }
);
