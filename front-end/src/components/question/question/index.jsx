import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

import {AskQuestionCard} from "../../../components";

function Question({single_question}) {
  let {username, answers, created_on, title, question, votes} = single_question
  console.log(question);
  return (
    <>
      <div className="question_header">
      <AskQuestionCard pageTitle ={title}/>
        <div className="question_creation_details">
          <span>Asked: {created_on}</span>
         
        </div>
      </div>
      <div className="question_description">
        <div className="question_votes">
          <div className="upvote">
            <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
              <AiOutlineCaretUp />
            </IconContext.Provider>
          </div>
          <div className="votes">{votes}</div>
          <div className="downvote">
            <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
              <AiFillCaretDown />
            </IconContext.Provider>
          </div>
        </div>
        <div className="question_text">
          {question}
        </div>
      </div>
    </>
  );
}
export default Question;
