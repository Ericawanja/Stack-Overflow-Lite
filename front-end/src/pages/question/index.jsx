import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Question, Answers, AddAnswer } from "../../components";
import { fetchOneQuestions } from "../../redux/thunks/question.thunks";

function QuestionPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const question = useSelector((state) => state.questions.question);
  let { comments, answers } = question;

  useEffect(() => {
    dispatch(fetchOneQuestions(id));
  }, []);
  return (
    <div className="question-container">
      <div className="question_wrapper">
        <Question single_question={question} />
        <div className="answers_container">
          <div className="answers_header">Answers</div>
          {answers?.length > 0 ? (
            answers.map((answer) => {
              return <Answers single_answer={answer} />;
            })
          ) : (
            <h6>No answers yet</h6>
          )}
        </div>
        <AddAnswer />
      </div>
    </div>
  );
}

export default QuestionPage;
