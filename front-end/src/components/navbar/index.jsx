import { NavLink } from "react-router-dom";


export default function Navbar({ close_icon, close_menu }) {
  return (
    <div className="layout_aside_inner" onClick={close_menu}>
      <div className="top_nav_element">
        <span>
          {" "}
          <NavLink to="/questions">Questions</NavLink>
        </span>
      </div>
      <div className="quiz_links">
        <div>
          <NavLink
            to="/questions"
           
          >
            All
          </NavLink>
        </div>

        <div>
          <NavLink
            to="users-questions"
          
          >
            My questions
          </NavLink>
        </div>
      </div>

      <div>
        <NavLink
          to="/questions/profile"
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile
        </NavLink>
      </div>
      <div className="layout_logout_side">
        <NavLink
          to="/"
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          Log Out
        </NavLink>
      </div>
    </div>
  );
}
