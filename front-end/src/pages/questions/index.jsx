import React from "react";
import { useSelector } from "react-redux";
import { QuestionCard, AskQuestionCard } from "../../components";

function QuestionsPage() {
  const { questions } = useSelector((state) => state.questions);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
      <AskQuestionCard pageTitle ="Questions"/>
        {questions?.map((single_question) => {
          return <QuestionCard single_question={single_question} />;
        })}
      </div>
    </div>
  );
}

export default QuestionsPage;
