export const validateRegister = (registerDetails) => {
  let { username, email, password, confirm_password } = registerDetails;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (username.trim() === "") {
    return { message: "The username field is empty" };
  } else if (username.length < 3) {
    return { message: "The username should have more than three characters" };
  } else if (/^\d+$/.test(username)) {
    return { message: "The username must have a character" };
  } else if (!email.match(emailRegex)) {
    return { message: "The email is not valid" };
  } else if (email.trim() === "") {
    return { message: "The email field is empty" };
  } else if (password.trim() === "" || password.length < 8) {
    return {
      message:
        "The password field should not be empty and must have atleast 8 characters",
    };
  }else if(password !== confirm_password){
    return { message: "The passwords are not equal" };
  }else{
    return { message: "valid" };
  }
};
