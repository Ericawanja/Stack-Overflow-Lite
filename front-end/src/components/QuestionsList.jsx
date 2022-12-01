import React from "react";
import { Link } from "react-router-dom";
import questions from '../utils/dummyQuestions'

function QuestionsList() {
  let tags = ["javascript", "reactjs", "web"];
  
  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        {questions.map(question=>{
        return <div className="quiz_list">
          <div className="quiz_list_left">
            <span>0 votes</span>
            <span>0 Answers</span>
          </div>
          <div className="list_middle">
            <div className="quiz_title"><Link to="/questions/1">The title of the question</Link></div>
            <div className="quiz_description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              laborum hic maiores maxime illo rem fugiat vero facere enim eaque
              soluta qui...
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
