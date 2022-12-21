import React from "react";

import { FiAlertTriangle } from "react-icons/fi";
import { IconContext } from "react-icons";

function Alert({ message }) {
  return (
    <div>
      <div className="alert-danger">
        <span>
          <IconContext.Provider value={{ size: "20px", color: "red" }}>
            <FiAlertTriangle />
          </IconContext.Provider>
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Alert;
