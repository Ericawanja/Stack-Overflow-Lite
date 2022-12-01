import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

function Question() {
  return (
    <div className="question-container">
      <div className="question_wrapper">
        <div className="question_header">
          <div className="question_title">The question title</div>
          <div className="question_creation_details">
            <span>Asked: Today</span>
            <span>Modified: Not Modified yet</span>
          </div>
        </div>
        <div className="question_description">
          <div className="question_votes">
            <div className="upvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiOutlineCaretUp />
              </IconContext.Provider>
            </div>
            <div className="votes">0</div>
            <div className="downvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>
          </div>
          <div className="question_details">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            adipisci iusto magnam fugiat voluptas! Id pariatur optio tempora
            earum assumenda nam velit, aspernatur, est eum quibusdam, laudantium
            adipisci vel fuga.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
