import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { LogInUser } from "../../redux/thunks/user.thunks";

function Login() {
  const { user, loading, error } = useSelector((state) => state.user);

  const [state, setState] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle input change
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (event) => {
    dispatch(LogInUser(state));
  };

  useEffect(() => {
    if (user?.id) {
      navigate("/questions");
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login_header">
          <span className="logo">Q-Lite</span>
          <span className="login_login">Log in</span>
        </div>
        <div className="login_welcome">
          <h3>Welcome back</h3>
          <p>Please enter your details to proceed</p>
        </div>

        {error && <Alert message={error} />}
        <div className="login_form">
          <label htmlFor="login_email">Enter your Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />

          <label htmlFor="login_password">Enter your password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />

          <div className="login_btn">
            <button disabled={loading} onClick={handleLoginSubmit}>
              {loading ? "Loading..." : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
