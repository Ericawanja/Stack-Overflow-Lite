import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/validateLogin";

import { FiAlertTriangle } from "react-icons/fi";
import { IconContext } from "react-icons";

function Login() {
  const navigate = useNavigate();
  const [login_details, setLogin_details] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  let { email, password } = login_details;

  let inputRef = useRef()
  
  //handle input change
  const handle_login_change = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setLogin_details({ ...login_details, [name]: value });
  
  };

  const handle_login = (event) => {
   
    let { message } = validate(login_details);
    console.log(message);
    if (message === "valid") {
      //dispatch the authetication api
      navigate("/questions");
    } else {
      setAlert(true);
      setAlertMsg(message);
      return;
    }
  };

  
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login_header">
          <span className="logo">Stack Overflow-Lite</span>
          <span className="login_login">Log in</span>
        </div>
        <div className="login_welcome">
          <h3>Welcome back</h3>
          <p>Please enter your details to proceed</p>
        </div>
        <div className="login_form">
          <label htmlFor="login_email">Enter your Email</label>
          <input
          ref={inputRef}
            type="email"
            name="email"
            value={email}
            onChange={(e) => handle_login_change(e)}
            onFocus={()=>setAlert(false)}
          />

          <label htmlFor="login_password">Enter your password</label>
          <input
          ref={inputRef}
            type="password"
            name="password"
            value={password}
            onChange={(e) => handle_login_change(e)}
            onFocus={()=>setAlert(false)}
          />

          {alert && (
            <div>
              <div className="login_alert">
                <span>
                  <IconContext.Provider value={{ size: "32px", color: "red" }}>
                    <FiAlertTriangle />
                  </IconContext.Provider>
                </span>
                <span>
                  <h3 style={{ color: "red", textTransform: "uppercase" }}>
                    {alertMsg}
                  </h3>
                </span>
              </div>
            </div>
          )}

          <div className="login_btn">
            <button onClick={(e) => handle_login(e)}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
