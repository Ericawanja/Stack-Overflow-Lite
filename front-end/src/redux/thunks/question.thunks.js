import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuestionService } from "../../services";

// FETCH ALL QUESTIONS
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetch-all-questions",
  async ({ limit=10, page=1 }, thunkAPI) => {
    const response = await QuestionService.GetAllQuestions({ limit, page });

    console.log("RESP", response);

    if (response.error !== null) {
     return thunkAPI.rejectWithValue({ error: response.error });
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
  async ({searchTerm, limit, page}, thunkAPI) => {
    const response = await QuestionService.GetsearchedQuestions({searchTerm, limit, page});

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { question: response.data };
  }
);

//FETCH USER QUESTIONS
export const getUsersQuestions = createAsyncThunk(
  "questions/user questions",
  async ({ limit, page }, thunkAPI) => {
    try {
      const response = await QuestionService.GetUserQuestions({ limit, page });

   

      if (response.error !== null) {
        return thunkAPI.rejectWithValue({ error: response.error });
      }
      return { question: response.data };
    } catch (error) {
      console.log(error);
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/create question",
  async (questionDetails, thunkAPI) => {
    const response = await QuestionService.CreateQuestion(questionDetails);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }
    thunkAPI.dispatch(fetchAllQuestions({ limit:10, page:1 }));
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
    thunkAPI.dispatch(fetchAllQuestions({ limit:10, page:1 }));
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
      return thunkAPI.rejectWithValue({ error: response.error });
    }
    thunkAPI.dispatch(fetchOneQuestions({ question_id: details.question_id }));
    return { message: response.data.message };
  }
);

export const voteAnswer = createAsyncThunk(
  "questions/ vote answer",
  async (details, thunkAPI) => {
    const response = await QuestionService.VoteAnswer(details);

    if (response.error) {
      return thunkAPI.rejectWithValue({ error: response.error });
    }
    thunkAPI.dispatch(fetchOneQuestions({ question_id: details.question_id }));
    return { message: response.data.message };
  }
);

export const orderByAnswers = createAsyncThunk(
  "questions/order questions by answers",
  async (_, thunkAPI) => {
    const response = await QuestionService.OrderQuestionsByAnswers();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { questions: response.data };
  }
);

export const getUserAnswers = createAsyncThunk(
  "questions/user answers",
  async (_, thunkAPI) => {
    const response = await QuestionService.GetUserAnswers();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { answers: response.data };
  }
);

export const getUserComments = createAsyncThunk(
  "questions/ user comments",
  async (_, thunkAPI) => {
    const response = await QuestionService.GetUserComments();

    if (response.error) {
      thunkAPI.rejectWithValue({ error: response.error });
    }

    return { comments: response.data };
  }
);
