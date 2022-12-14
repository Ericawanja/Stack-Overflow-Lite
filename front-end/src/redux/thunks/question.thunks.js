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

    return { questions: response.data};
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
