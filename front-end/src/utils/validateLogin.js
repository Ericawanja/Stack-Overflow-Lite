export const validate = (login_details) => {
  const { email, password } = login_details;
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;



  if (email.trim() === "") {
    return {message: 'The email field is empty'}
  } else if (!email.match(validRegex)) {
    return {message: 'The email is invalid'}
  } else if (password.trim() === ""){
    return {message: 'The password field is empty'}
  }else if(password.length < 8){
    return {message: 'The password should have more than 8 characters'}
    //CHECK IF THE USER ENTERS A SEQUENCE OF NUMBERS
  }else{
    return {message: 'valid'}
  }
};
