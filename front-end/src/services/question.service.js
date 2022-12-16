//logic for api calls used in the thunks

import axios from "axios";

class QuestionService {
  BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://my-json-server.typicode.com/Ericawanja/jsonserver/questions"
      : "http://localhost:5000/questions";

  TOKEN = localStorage.getItem("token");
  config = {
    headers: { Authorization: `Bearer ${this.TOKEN}` },
  };

  async GetAllQuestions() {
    try {
      const response = await axios.get(this.BASE_URL, this.config);

      return { data: response.data, error: null };
    } catch (error) {
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

  async GetsearchedQuestions(searchTerm) {
    try {
      const response = await axios.post(
        this.BASE_URL + "/list/search",
        { searchTerm },
        this.config
      );

      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async GetUserQuestions() {
    try {
      const response = await axios.get(
        this.BASE_URL + "/user/created",
        this.config
      );
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async CreateQuestion(questionDetails) {
    console.log(questionDetails);
    try {
      const response = await axios.post(
        this.BASE_URL,
        questionDetails,
        this.config
      );
      console.log(response);
      return { message: response.data, error: null };
    } catch (error) {
      console.log(error?.response?.data?.errors);
     
      const message =
      error?.response?.data?.errors[0] ||
        "An error occurred. Please try again later";

      return { data: null, error: message };
     
    }
  }
}

export default new QuestionService();
