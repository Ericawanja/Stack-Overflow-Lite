import React from "react";
import { Link, useOutletContext } from "react-router-dom";

import {QuestionCard} from "../../components"

function QuestionsPage() {
  const { questions } = useOutletContext();
  console.log(questions);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        {questions.map((single_question) => {
          
          return <QuestionCard single_question ={single_question}/>
        })}
        
      </div>
    </div>
  );
}

export default QuestionsPage;
