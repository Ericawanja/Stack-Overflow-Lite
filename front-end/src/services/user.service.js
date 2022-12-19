import axios from "axios";

class UserService {
  BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://my-json-server.typicode.com/Ericawanja/jsonserver/users"
      : "http://localhost:9090/users";
  async LogInUser(details) {
    try {
      let url = "http://localhost:5001/user/login";
      const { data } = await axios.post(url, details);

      localStorage.setItem("token", data?.token);
      return { data: data?.user, error: null };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again later";

      return { data: null, error: message };
    }
  }

  async GetLoggedUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        let url = "http://localhost:5001/user/me";
        const { data } = await axios.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("token", data?.token);
        
        return { data: data?.user, error: null };
      }

      return { data: null, error: "No Token" };
    } catch (error) {
      localStorage.clear();
      return { data: null, error: "Invalid Token" };
    }
  }

  async SignupUser(details) {
    try {
      let url = "http://localhost:5001/user/signup";
      const response = await axios.post(url, details);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Invalid details. Please try again later";

      return { data: null, error: message };
    }
  }
}

export default new UserService();
