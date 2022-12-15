import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  fetchAllQuestions,
  searchQuestions,
} from "../../redux/thunks/question.thunks";
import { Navbar } from "../../components";

function QuestionLayout() {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(true);

  let open_icon = useRef();
  let close_icon = useRef();
  let nav = useRef();

  const open_menu = () => {
    setOpenMenu(true);
    open_icon.current.style.display = "none";
    close_icon.current.style.display = "block";
    nav.current.style.display = "block";
  };
  const close_menu = () => {
    setOpenMenu(false);
    const { innerWidth } = window;
    if (innerWidth <= 850) {
      open_icon.current.style.display = "block";
      close_icon.current.style.display = "none";
      nav.current.style.display = "none";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.trim() === "") {
      dispatch(fetchAllQuestions());
    }
  };
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      return;
    }
    dispatch(searchQuestions(searchTerm));
  
  };

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  return (
    <div className="layout-container">
      <div className="layout_wrapper">
        <div className="layout_header">
          <div className="menu" ref={open_icon} onClick={open_menu}>
            <IconContext.Provider value={{ color: "black", size: "32px" }}>
              <AiOutlineMenuUnfold />
            </IconContext.Provider>
          </div>

          <div className="close_icon" ref={close_icon} onClick={close_menu}>
            <IconContext.Provider value={{ color: "black", size: "32px" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          </div>

          <div className="logo">Q Lite</div>
          <div className="search">
            <span className="search_input">
              <input
                type="text"
                placeholder="Type to search"
                value={searchTerm}
                onChange={handleInput}
              />
            </span>
            <span className="search_btn" onClick={handleSearch}>
              <IconContext.Provider value={{ color: "white", size: "16px" }}>
                <FaSearch />
              </IconContext.Provider>
            </span>
          </div>
        </div>
        <div className="layout_body">
          <div className="layout_aside" ref={nav}>
            {" "}
            <Navbar close_icon={close_icon} close_menu={close_menu} />
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
