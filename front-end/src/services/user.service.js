class UserService {
  BASE_URL =  process.env.NODE_ENV === "production" ?"https://my-json-server.typicode.com/Ericawanja/jsonserver/users":"http://localhost:9090/users";
  async LogInUser({ email, password }) {
    // Make API Call
    //Return logged in user or error
    try {
      const response = await fetch(this.BASE_URL);
      const data = await response.json();

      const user = data.filter((user) => user.email === email);
      // console.log(user);
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
