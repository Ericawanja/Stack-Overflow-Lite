import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllQuestions, getUsersQuestions } from "../../redux/thunks/question.thunks";

export default function Navbar({ close_icon, close_menu }) {
  const dispatch = useDispatch();
 

  return (
    <div className="layout_aside_inner" onClick={close_menu}>
      <div className="top_nav_element">
        <span>
          {" "}
          <NavLink to="/questions">Questions</NavLink>
        </span>
      </div>
      <div className="quiz_links">
        <div  onClick={()=>dispatch(fetchAllQuestions())}>
          <NavLink to="/questions">All</NavLink>
        </div>

        <div onClick={()=>dispatch(getUsersQuestions())}>
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
  );
}
