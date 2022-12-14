import React from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

import {AskQuestionCard} from "../../../components";

function Question({single_question}) {
  let { created_on, title, question, votes} = single_question
  let createdOn = new Date(created_on).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  return (
    <>
      <div className="question_header">
      <AskQuestionCard pageTitle ={title}/>
        <div className="question_creation_details">
          <span>Asked on: { createdOn}</span>
         
        </div>
      </div>
      <div className="question_description">
       
        <div className="question_text">
          {question}
        </div>
      </div>
    </>
  );
}
export default Question;
