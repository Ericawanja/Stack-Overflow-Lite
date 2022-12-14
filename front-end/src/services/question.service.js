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

  async GetOneQuestion({question_id}) {
    try {
     
      const response = await axios.get(this.BASE_URL + "/" + question_id, this.config);
      
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
}

export default new QuestionService();
