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
