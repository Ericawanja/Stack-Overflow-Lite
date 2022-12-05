import React, { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { QuestionCard, AskQuestionCard } from "../../components";

function QuestionsPage({ list = "all" }) {
  let { questions } = useSelector((state) => state.questions);
  let user_name = "User Two";

  const filteredQuestions = useMemo(() => {
    if (list === "all") return questions;

    //filter here and return
    questions = questions.filter((question) => question.username === user_name);
    return questions;
  }, [list, questions]);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        <AskQuestionCard pageTitle="Questions" />
        {filteredQuestions?.map((single_question) => {
          return <QuestionCard single_question={single_question} />;
        })}
      </div>
    </div>
  );
}

export default QuestionsPage;
