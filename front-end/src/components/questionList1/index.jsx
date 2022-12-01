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
             let {question_id, user_id, title, question,tags, created_on, } = single_question
        return <div className="quiz_list">
           
          <div className="quiz_list_left">
            <span>0 votes</span>
            <span>0 Answers</span>
          </div>
          <div className="list_middle">
            <div className="quiz_title"><Link to="/questions/1">{title}</Link></div>
            <div className="quiz_description">
              {question}
            </div>
            <div className="quiz_list_details">
              <div className="tags">
                {tags.map((tag) => {
                  return <span>{tag}</span>;
                })}
              </div>
              <div className="quiz_creation_details">
                <div className="author">Author name</div>
                <div className="date_created">Created on:01/01/2022</div>
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
