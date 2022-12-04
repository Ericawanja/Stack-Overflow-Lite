import React from "react";

import { Question, Answers, AddAnswer } from "../../components";

function QuestionPage() {
  return (
    <div className="question-container">
      <div className="question_wrapper">
        
        <Question />
        <Answers />
        <AddAnswer />
      </div>
    </div>
  );
}

export default QuestionPage;
