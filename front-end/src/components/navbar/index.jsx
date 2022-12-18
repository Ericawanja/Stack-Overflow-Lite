import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchAllQuestions,
  getUsersQuestions,
  orderByAnswers,
} from "../../redux/thunks/question.thunks";

export default function Navbar({ close_menu }) {
  const dispatch = useDispatch();

 

  return (
    <div className="layout_aside_inner">
      <div className="top_nav_element">
        <span>
          {" "}
          <NavLink to="/questions">Questions</NavLink>
        </span>
      </div>

      <div className="quiz_links" onClick={close_menu}>
        <div onClick={() => dispatch(fetchAllQuestions())}>
          <NavLink to="/questions">All</NavLink>
        </div>

        <div onClick={() => dispatch(getUsersQuestions())}>
          <NavLink to="users-questions">My questions</NavLink>
        </div>
        <div
          className="order"
          onClick={() => dispatch(orderByAnswers())}
        >
          <NavLink to="/questions">order By answers</NavLink>
        </div>
      </div>

      <div onClick={close_menu}>
        <NavLink to="/questions/profile">Profile</NavLink>
      </div>
      <div className="layout_logout_side">
        <NavLink to="/">Log Out</NavLink>
      </div>
    </div>
  );
}
