//logic for api calls used in the thunks



// import { awaitPromise } from ".";

class QuestionService {
  BASE_URL = "http://localhost:9090/questions";

  async GetAllQuestions() {
    try {
      const response = await fetch(this.BASE_URL);
      const data = await response.json();

      

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async GetOneQuestion(questionId){
    try {
        const response = await fetch(this.BASE_URL+"/"+questionId);
        const data = await response.json();

        // 
  
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
  }


}

export default new QuestionService();
