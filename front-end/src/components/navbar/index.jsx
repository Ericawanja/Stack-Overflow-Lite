import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/user.slice";
import {
  fetchAllQuestions,
  getUsersQuestions,
  orderByAnswers,
} from "../../redux/thunks/question.thunks";

export default function Navbar({ close_menu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="layout_aside_inner">
      <div className="top_nav_element">
        <span>
          {" "}
          <Link to="/questions">Questions</Link>
        </span>
      </div>

      <div className="quiz_links" onClick={close_menu}>
        <div
          onClick={() => dispatch(fetchAllQuestions())}
          className={pathname === "/questions" ? "active" : ""}
        >
          <Link to="/questions">All</Link>
        </div>
        <div className="order" onClick={() => dispatch(orderByAnswers())}>
          <Link to="/questions">order By answers</Link>
        </div>

        <div onClick={() => dispatch(getUsersQuestions())}>
          <Link
            to="users-questions"
            className={pathname === "/questions/users-questions" ? "active" : ""}
          >
            Asked
          </Link>
        </div>
      </div>

      <div
        onClick={close_menu}
        className={pathname === "/questions/profile" ? "active" : ""}
      >
        <Link to="/questions/profile">Profile</Link>
      </div>
      <div className="logout" onClick={handleLogout}>
        <span>Log Out</span>
      </div>
    </div>
  );
}
