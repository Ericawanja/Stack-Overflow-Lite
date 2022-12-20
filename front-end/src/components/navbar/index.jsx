import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/user.slice";
import {
  fetchAllQuestions,
  getUsersQuestions,
  orderByAnswers,
} from "../../redux/thunks/question.thunks";

export default function Navbar({ close_menu }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.clear();
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
          // onClick={() => dispatch(fetchAllQuestions({ limit: 5, page: 1 }))}
          className={pathname === "/questions" ? "active" : ""}
        >
          <Link
            to="/questions"
            onClick={() => dispatch(fetchAllQuestions({ limit: 5, page: 1 }))}
          >
            All
          </Link>
        </div>
        <div className="order" onClick={() => dispatch(orderByAnswers())}>
          <Link to="/questions" onClick={() => dispatch(orderByAnswers())}>
            order By answers
          </Link>
        </div>

        <div onClick={() => dispatch(getUsersQuestions({ limit: 5, page: 1 }))}>
          <Link
            to="users-questions"
            className={
              pathname === "/questions/users-questions" ? "active" : ""
            }
            onClick={() => dispatch(getUsersQuestions({ limit: 5, page: 1 }))}
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
      {user?.id ? (
        <div className="logout" onClick={handleLogout}>
          <span>Log Out</span>
        </div>
      ) : (
        <div
          onClick={close_menu}
          className={pathname === "/login" ? "active" : ""}
        >
          <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
}
