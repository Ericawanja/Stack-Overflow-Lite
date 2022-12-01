import React,{useEffect} from "react";
import { Outlet, NavLink } from "react-router-dom";
import {IconContext} from 'react-icons'
import {FaSearch} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuestions } from "../../redux/thunks/question.thunks";

function QuestionLayout() {
  const dispatch = useDispatch()
  const {questions }= useSelector(state=>state)
  
  useEffect(() => {
    dispatch(fetchAllQuestions());
  
   
  }, [])
  
  return (
    <div className="layout-container">
      <div className="layout_wrapper">
        <div className="layout_header">
          <div className="logo">Stack Overflow-Lite</div>
          <div className="search">
            <span className="search_input"><input type="text" /></span>
            <span className="search_btn">
              <IconContext.Provider value={{color: "white", size: "20px" }}>
                <FaSearch/>
              </IconContext.Provider>
            </span>
            </div>
            <div className="layout_logout">
                Log Out
            </div>
          
        </div>
        <div className="layout_body">
          <div className="layout_aside">
            <div className="layout_aside_inner">
             <div><NavLink to="/questions">Home</NavLink></div> 
              <div className="quiz_links">
                <span>Questions</span>
                <div><NavLink>All</NavLink></div>
                
            
                <div><NavLink>My questions</NavLink></div>
              </div>
              <div><NavLink>Tags</NavLink></div>
              <div><NavLink>Profile</NavLink></div>
            </div>
          </div>
          <div className="layout_main">
            <Outlet context={questions}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionLayout;
