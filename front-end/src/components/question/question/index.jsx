import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

import {AskQuestionCard} from "../../../components";

function Question() {
  return (
    <>
      <div className="question_header">
      <AskQuestionCard pageTitle ={`question`}/>
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
        <div className="question_text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
          adipisci iusto magnam fugiat voluptas! Id pariatur optio tempora earum
          assumenda nam velit, aspernatur, est eum quibusdam, laudantium
          adipisci vel fuga. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Aperiam nisi delectus quam dolor, id pariatur repellat magnam
          incidunt sed animi illum! Voluptatem molestiae quam consequatur minima
          delectus quisquam? Harum, dolorum?
        </div>
      </div>
    </>
  );
}
export default Question;
