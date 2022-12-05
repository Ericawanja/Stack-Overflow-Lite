class UserService {
  BASE_URL = "http://localhost:9090/users";
  async LogInUser({ email, password }) {
    // Make API Call
    //Return logged in user or error
    try {
      const response = await fetch(this.BASE_URL);
      const data = await response.json();
      console.log({ data });
      const user = data.filter((user) => user.email === email);
      console.log("ser");
      if (user.length > 0) return { message: null, data: { ...user[0] } };
      return { message: "User does not exist", data: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  async RegisterUser() {}

  async GetAllUsers() {}
}

export default new UserService();
