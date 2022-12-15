import React, { useMemo, useEffect, useState } from "react";


import { useSelector } from "react-redux";

import { QuestionCard, AskQuestionCard } from "../../components";

function QuestionsPage({ list = "all" }) {
  let { questions, searching, searchedQuestions } = useSelector(
    (state) => state.questions
  );

  questions = searching ? searchedQuestions : questions;
  
  let currentUser = JSON.parse(localStorage.getItem("user"));
  let [page, setPage] = useState("");

  const filteredQuestions = useMemo(() => {
    if (list === "all") {
      setPage("All Questions");
      return questions;
    }
    //filter here and return
    setPage("Your Questions");
    return questions.filter((question) => question.user_id === currentUser.id);
  }, [list, questions, currentUser.id]);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        <AskQuestionCard pageTitle={page} />
        {questions?.map((single_question) => {
          return (
            <QuestionCard
              key={single_question.question_id}
              single_question={single_question}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionsPage;
