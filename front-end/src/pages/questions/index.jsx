import React, { useMemo, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import { QuestionCard, AskQuestionCard, Loading } from "../../components";
import { fetchAllQuestions, getUsersQuestions } from "../../redux/thunks/question.thunks";

function QuestionsPage({ list = "all" }) {
  let { questions, searching, searchedQuestions, loading } = useSelector(
    (state) => state.questions
  );

  questions = searching ? searchedQuestions : questions.data;

  let currentUser = JSON.parse(localStorage.getItem("user"));
  let [page, setPage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (list === "all") {
      setPage("All Questions");
      dispatch(fetchAllQuestions());
    } else {
      setPage("Your Questions");
      dispatch(getUsersQuestions())
    }

   
  }, []);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        <AskQuestionCard pageTitle={page} />

        {loading ? (
          <Loading />
        ) : questions?.length > 0 ? (
          questions?.map((single_question) => {
            return (
              <QuestionCard
                key={single_question.question_id}
                single_question={single_question}
                currentUser={currentUser}
              />
            );
          })
        ) : (
          <div className="listEmpty">
            <h2>No questions found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionsPage;
