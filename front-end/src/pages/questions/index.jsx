import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { QuestionCard, AskQuestionCard, Loading } from "../../components";
import {
  fetchAllQuestions,
  getUsersQuestions,
} from "../../redux/thunks/question.thunks";

function QuestionsPage({ list = "all" }) {
  let { questions, searching, searchedQuestions, loading } = useSelector(
    (state) => state.questions
  );
  const total = questions?.total;

  questions = searching ? searchedQuestions : questions.data;

  let currentUser = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();

  const goToPrevious = () => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const goToNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (list === "all") {
      dispatch(fetchAllQuestions({ limit, page, list:"all" }));
    } else {
      dispatch(getUsersQuestions({ limit, page, list:"mine"  }));
    }
  }, [limit, page, list]);

  return (
    <div className="Qlist-container">
      <div className="list_wrapper">
        <AskQuestionCard
          pageTitle={list === "all" ? "All Questions" : "Your Questions"}
        />

        {loading ? (
          <Loading />
        ) : questions?.length > 0 ? (
          <>
            {questions?.map((single_question) => {
              return (
                <QuestionCard
                  key={single_question.question_id}
                  single_question={single_question}
                  currentUser={currentUser}
                />
              );
            })}
            <div className="pagination">
              <button
                onClick={goToPrevious}
                disabled={page === 1}
                className="prev"
              >
                Prev
              </button>
              <span>
                Page {page} - {limit} of {total}
              </span>
              {console.log(Math.ceil(total / limit), page)}
              <button
                disabled={page >= Math.ceil(total / limit)}
                onClick={goToNext}
                className="next"
              >
                Next
              </button>
            </div>
          </>
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
