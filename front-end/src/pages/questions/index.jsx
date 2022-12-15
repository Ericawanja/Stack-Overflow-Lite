import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { QuestionCard, AskQuestionCard } from "../../components";

function QuestionsPage({ list = "all" }) {
  let { questions} = useSelector((state) => state.questions);
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
        {filteredQuestions?.map((single_question) => {
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
