//logic for api calls used in the thunks

import axios from "axios";





class QuestionService {
  BASE_URL = process.env.NODE_ENV === "production" ?"https://my-json-server.typicode.com/Ericawanja/jsonserver/questions":"http://localhost:9090/questions"; 


  async GetAllQuestions() {
    try {
      let url = "http://localhost:5000/questions"
      const token = localStorage.getItem('token')

      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
      const response = await axios.get(url,config);
     

      return {data: response.data, error: null };
    } catch (error) {
 
      return { data: null, error: error.message };
    }
  }

  async GetOneQuestion(questionId){
   
    try {
        const response = await fetch(this.BASE_URL+"/"+questionId);
        const data = await response.json();

        
  
        return { data, error: null };
      } catch (error) {
        return { data: null, error: error.message };
      }
  }


}

export default new QuestionService();
