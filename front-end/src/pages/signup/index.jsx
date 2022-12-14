import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { SignupUser } from "../../redux/thunks/user.thunks";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, registered } = useSelector((state) => state.user);

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = () => {
    dispatch(SignupUser(state));
    //return navigate("/login");
  };

  useEffect(() => {
    if (registered) {
    navigate("/login")
    }
  }, [registered]);

  return (
    <div className="signup_container">
      <div className="signup_wrapper">
        <div className="signup_header">
          <div className="logo">Q Lite</div>
          <div className="signup_header_right">
            <Link to="/" className="signup">
              Back
            </Link>
          </div>
        </div>
        {error && <Alert message={error} />}
        <div className="signup_form">
          <label htmlFor="username">Enter your username</label>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleInputChange}
            placeholder="username..."
          />
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="email..."
          />

          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            placeholder="password..."
          />

          {/* <label htmlFor="confirm_password">Confirm your password</label>
          <input
            type="password"
            name="confirm_password"
            value={state.confirm_password}
            onChange={ handleInputChange}
         
            placeholder="confirm password..."
          /> */}

          <div className="signup_btn">
            <button
              type="button"
              disabled={loading}
              onClick={handleSignupSubmit}
            >
              {loading ? "Loading...." : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
