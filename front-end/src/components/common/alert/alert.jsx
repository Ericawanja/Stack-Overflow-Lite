import React from "react";

import { FiAlertTriangle } from "react-icons/fi";
import { IconContext } from "react-icons";

function Alert({message}) {

  return (
    <div>
      <div className="login_alert">
        <span>
          <IconContext.Provider value={{ size: "32px", color: "red" }}>
            <FiAlertTriangle />
          </IconContext.Provider>
        </span>
        <span>
          <h3 style={{ color: "red", textTransform: "uppercase" }}>
            {message.message}
          </h3>
        </span>
      </div>
    </div>
  );
}

export default Alert;
