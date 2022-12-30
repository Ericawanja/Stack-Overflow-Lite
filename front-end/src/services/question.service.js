//logic for api calls used in the thunks

import axios from "axios";

class QuestionService {
  BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://my-json-server.typicode.com/Ericawanja/jsonserver/questions"
      : "http://localhost:5000/questions";

  TOKEN = localStorage.getItem("token");
  config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  async GetAllQuestions({ limit = 1, page = 1 }) {
    console.log(this.TOKEN);
    console.log(this.config, 'log');
    try {
      const response = await axios.get(
        `${this.BASE_URL}?limit=${limit}&page=${page}`,
        this.config
      );
      console.log(response);
      return { data: response.data, error: null };
    } catch (error) {
      console.log({error});
      return { data: null, error: error.message };
    }
  }

  async GetOneQuestion({ question_id }) {
    try {
      const response = await axios.get(
        this.BASE_URL + "/" + question_id,
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async GetsearchedQuestions({ searchTerm, limit, page }) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/list/search?limit=${limit}&page=${page}`,
        { searchTerm, page, limit },
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async GetUserQuestions({ limit = 5, page = 1 }) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/user/created?limit=${limit}&page=${page}`,
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }

  async CreateQuestion(questionDetails) {
    try {
      const response = await axios.post(
        this.BASE_URL,
        questionDetails,
        this.config
      );

      return { message: response.data, error: null };
    } catch (error) {
      const message =
        error?.response?.data?.errors[0] ||
        "An error occurred. Please try again later";

      return { data: null, error: message };
    }
  }

  async EditQuestion(details) {
    let { question_id, data } = details;
    try {
      const response = await axios.put(
        this.BASE_URL + "/" + question_id,
        data,
        this.config
      );

      return { message: response.data, error: null };
    } catch (error) {
      console.log(details.data);
      const message =
        error?.response?.data?.errors[0] ||
        "An error occurred. Please try again later";

      return { data: null, error: message };
    }
  }

  async DeleteQuestion(question_id) {
    try {
      const response = await axios.delete(
        this.BASE_URL + "/" + question_id,
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }
  async AddAnswer(answer) {
    try {
      const response = await axios.post(
        this.BASE_URL + "/answer/add",
        answer,
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }

  async AddComment(comment) {
    try {
      const response = await axios.post(
        this.BASE_URL + "/answer/comment",
        comment,
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }

  async PreferAnswer(details) {
    try {
      let answerId = { id: details.answer_id };
      let response;
      if (details.status === "prefer") {
        response = await axios.put(
          this.BASE_URL + "/answer/preffer",
          answerId,
          this.config
        );
      } else {
        response = await axios.put(
          this.BASE_URL + "/answer/unprefer",
          answerId,
          this.config
        );
      }

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }
  async VoteAnswer(details) {
    try {
      let answerId = { answer_id: details.answer_id };
      let response;
      if (details.status === "upvote") {
        response = await axios.post(
          this.BASE_URL + "/answer/upvote",
          answerId,
          this.config
        );
      } else {
        response = await axios.post(
          this.BASE_URL + "/answer/downvote",
          answerId,
          this.config
        );
      }

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response.data };
    }
  }

  async OrderQuestionsByAnswers() {
    try {
      const response = await axios.get(
        this.BASE_URL + "/ordered/top",
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
  async GetUserComments() {
    try {
      const response = await axios.get(
        this.BASE_URL + "/user/comments",
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async GetUserAnswers() {
    try {
      const response = await axios.get(
        this.BASE_URL + "/user/answers",
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
}

export default new QuestionService();
