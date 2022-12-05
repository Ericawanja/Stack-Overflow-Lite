import React from "react";
import { Link } from "react-router-dom";

import { FiAlertTriangle } from "react-icons/fi";
import { IconContext } from "react-icons";

function Alert({ message, user }) {
  console.log(user);
  return (
    <div>
      <div className="login_alert">
        <span>
          <IconContext.Provider value={{ size: "32px", color: "red" }}>
            <FiAlertTriangle />
          </IconContext.Provider>
        </span>
        {!user.error && (
          <span>
            <h3 style={{ color: "red", textTransform: "uppercase" }}>
              {message}
            </h3>
          </span>
        )}
        {
          user.error &&(
            <h3>User does not exist <Link to='/signup' style={{cursor:'pointer', borderBottom:'2px solid black'}}>Sign up</Link></h3>
          )
        }
      </div>
    </div>
  );
}

export default Alert;
