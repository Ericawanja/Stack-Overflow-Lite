import React from "react";
import { TiMessages } from "react-icons/ti";
import { GiCheckMark } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import {  Link } from "react-router-dom"

function LandingPage() {
  return (
    <div className="landing_container">
      <div className="landing_wrapper">
        <div className="L-header">
          <div className="logo">Stack Overflow_Lite</div>
          <div className="L-header_left">
            <Link to="/login" className="login">Log in</Link>
            <Link to="/signup" className="signup">Sign up</Link>
          </div>
        </div>
        <div className="hero">
          <div className="hero_image">
            <img src="/assets/questions.png" alt="questions" />
          </div>
          <div className="hero_text">
            <h3>All answers in one place</h3>
            <p>
              With over a million questions asked 99% of them answered and
              countless number of users you will have all your answers in a
              second
            </p>
          </div>
        </div>
        <div className=" why-us_container">
            <h3>Why use this platform</h3>
        <div className="why-us">
          <div>
            <span className="why-us_icon">
              <IconContext.Provider value={{ color: "#100720", size: "32px" }}>
                <TiMessages />
              </IconContext.Provider>
            </span>
            <span className="why-us_heading">Expert answers</span>
            <span className="why-us_details">
              We verify all our users to ensure only experts are top-rated
            </span>
          </div>
          <div>
            <span className="why-us_icon">
              <IconContext.Provider value={{ color: "#100720", size: "32px" }}>
                <FaUserFriends />
              </IconContext.Provider>
            </span>
            <span className="why-us_heading">Users</span>
            <span className="why-us_details">
              Over 1 million active users who are more than willing to share
              their knowledge
            </span>
          </div>
          <div>
            <span className="why-us_icon">
              <IconContext.Provider value={{ color: "#100720", size: "32px" }}>
                <GiCheckMark />
              </IconContext.Provider>
            </span>
            <span className="why-us_heading">Best answer First</span>
            <span className="why-us_details">
              We rank the answers and have the best answers appear first
            </span>
          </div>
        </div>
        </div>
        <div className="L-register">
            <span className="L-register_btn"> Dont have an account? <Link to='/login'>Sign up</Link></span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
