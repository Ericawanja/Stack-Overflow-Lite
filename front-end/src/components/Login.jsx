import React, {useState} from "react";

function Login() {
  const [login_details, setLogin_details] = useState({
    email: "",
    password: "",
  });
  const { email, password } = login_details;
  const handle_login_change = (event) => {
    let name = event.target.name
    let value  = event.target.value
    setLogin_details({...login_details, [name]:value})
  };
  console.log(email, password);

  const handle_login = (event)=>{
    

  }
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
            type="email"
            name="email"
            value={email}
            onChange={(e) => handle_login_change(e)}
          />

          <label htmlFor="login_password">Enter your password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handle_login_change(e)}
          />
          <div className="login_btn">
            <button onClick={(e)=>handle_login(e)}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
