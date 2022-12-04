class UserService {
  BASE_URL = "http://localhost:9090/users";
  async LoginUser(email, pasword) {
    // Make API Call
    //Return logged in user or error
    try{
        const response = await fetch(this.BASE_URL)
        const user = response.data.filter(user=>user.email === email)
        if(user.length>0) return user
        return({message:"User does not exist"})
    }catch(error){
        return{data:null, error:error.message}
    }
  }

  async RegisterUser() {}

  async GetAllUsers() {}
}

export default new UserService();
