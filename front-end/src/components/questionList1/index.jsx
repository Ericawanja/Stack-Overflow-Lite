import React from "react";
import { Link, useOutletContext  } from "react-router-dom";
import questions1 from '../../utils/dummyQuestions'

function QuestionsList() {
 
  const {questions} = useOutletContext()
  console.log(questions);
  
  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        {questions.map(single_question=>{
             let {question_id, username, title, question,tags, created_on, votes} = single_question
             let sub_string = question.slice(0, 130)
        return <div className="quiz_list">
           
          <div className="quiz_list_left">
            <span>{votes} votes</span>
            <span>0 Answers</span>
          </div>
          <div className="list_middle">
            <div className="quiz_title"><Link to="/questions/1">{title}</Link></div>
            <div className="quiz_description">
              {sub_string}...
            </div>
            <div className="quiz_list_details">
              <div className="tags">
                {tags.map((tag) => {
                  return <span>{tag}</span>;
                })}
              </div>
              <div className="quiz_creation_details">
                <span className="author">Asked by: {username}</span>
                <span className="date_created">Created on: {created_on}</span>
              </div>
            </div>
          </div>
        </div>
        })}
      </div>
    </div>
  );
}

export default QuestionsList;
