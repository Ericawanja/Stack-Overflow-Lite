import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestions } from "../../redux/thunks/question.thunks";

function QuestionLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  return (
    <div className="layout-container">
      <div className="layout_wrapper">
        <div className="layout_header">
          <div className="menu">
          <IconContext.Provider value={{ color: "black", size: "32px" }}>
                <AiOutlineMenuUnfold/>
              </IconContext.Provider>
            
          </div>

          <div className="logo">Q Lite</div>
          <div className="search">
            <span className="search_input">
              <input type="text" />
            </span>
            <span className="search_btn">
              <IconContext.Provider value={{ color: "white", size: "16px" }}>
                <FaSearch />
              </IconContext.Provider>
            </span>
          </div>
          
        </div>
        <div className="layout_body">
          <div className="layout_aside">
            <div className="layout_aside_inner">
              <div>
                <NavLink to="/questions">Questions</NavLink>
              </div>
              <div className="quiz_links">
                <div>
                  <NavLink to="/questions">All</NavLink>
                </div>

                <div>
                  <NavLink to="users-questions">My questions</NavLink>
                </div>
              </div>

              <div>
                <NavLink to="/questions/profile">Profile</NavLink>
              </div>
              <div className="layout_logout_side">
            <NavLink to="/">Log Out</NavLink>
          </div>
            </div>
          </div>
          <div className="layout_main">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionLayout;
