import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { QuestionCard, AskQuestionCard } from "../../components";

function QuestionsPage({ list = "all" }) {
  let { questions } = useSelector((state) => state.questions);
  let user_name = "User Two";
let [page, setPage] = useState('')
  const filteredQuestions = useMemo(() => {
    if (list === "all") {
      setPage('All Questions')
      return questions;
    }

    //filter here and return
    questions = questions.filter((question) => question.username === user_name);
    setPage('Your Questions')
    return questions;
  }, [list, questions]);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        <AskQuestionCard pageTitle={page} />
        {filteredQuestions?.map((single_question) => {
          return <QuestionCard single_question={single_question} />;
        })}
      </div>
    </div>
  );
}

export default QuestionsPage;
