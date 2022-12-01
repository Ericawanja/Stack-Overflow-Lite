import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const [signup_details, setSignup_details] = useState({
    name: "",
    username: "",
    email:"",
    password:"",
    confirm_password:""
  });
  let {name, username, email, password, confirm_password} = signup_details

  const handle_signup = ()=>{
    //validation
    //set the state and dispatch sign in
    //navigate
   
    navigate('/login', {replace: true})


  }
  return (
    <div className="signup_container">
      <div className="signup_wrapper">
        <div className="signup_header">
          <div className="logo">Stack Overflow_Lite</div>
          <div className="signup_header_right">
            <Link to="/" className="signup">
              Back
            </Link>
          </div>
        </div>
        <div className="signup_form">
          <label htmlFor="name">Enter your name</label>
          <input type="text" name="name" value={name}/>

          <label htmlFor="username">Enter your username</label>
          <input type="text" name="username" value={username}/>

          <label htmlFor="email">Enter your email</label>
          <input type="email" name="email" value={email}/>

          <label htmlFor="password">Enter your password</label>
          <input type="password" name="password" value={password}/>

          <label htmlFor="confirm_password">Enter your password</label>
          <input type="password" name="confirm_password" value={confirm_password}/>

        <div className="signup_btn">
          <button type="button" onClick={handle_signup}>Save</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
