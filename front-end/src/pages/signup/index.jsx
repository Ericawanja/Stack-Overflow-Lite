import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/common/alert/alert";

import { validate, validateRegister } from "../../utils/validateRegister";

function Signup() {
  const navigate = useNavigate();
  const [signup_details, setSignup_details] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  let { username, email, password, confirm_password } = signup_details;

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handle_inputs = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(name, value);
    setSignup_details({ ...signup_details, [name]: value });
  };

  const handle_signup = () => {
    //validation
    let message = validateRegister(signup_details);
    console.log(message);

    //navigate
    if (message === "valid") {
      navigate("/questions");
    } else {
      setAlert(true);
      setAlertMsg(message);
      return;
    }

    // navigate("/login", { replace: true });
  };
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
          <label htmlFor="username">Enter your username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handle_inputs(e)}
            onFocus={() => setAlert(false)}
            placeholder="username..."
          />
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handle_inputs(e)}
            onFocus={() => setAlert(false)}
            placeholder="email..."
          />

          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handle_inputs(e)}
            onFocus={() => setAlert(false)}
            placeholder="password..."
          />

          <label htmlFor="confirm_password">Confirm your password</label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={(e) => handle_inputs(e)}
            onFocus={() => setAlert(false)}
            placeholder="confirm password..."
          />

          {alert && <Alert message= {alertMsg}/>}
          <div className="signup_btn">
            <button type="button" onClick={handle_signup}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
