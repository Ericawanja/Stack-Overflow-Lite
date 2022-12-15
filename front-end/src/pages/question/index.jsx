import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Question, Answers, AddAnswer } from "../../components";
import { fetchOneQuestions } from "../../redux/thunks/question.thunks";

function QuestionPage() {
  const dispatch = useDispatch();
  const { question } = useSelector((state) => state.questions);
  console.log(question);
  let answers = question?.question?.answers;
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    console.log("effect");
    dispatch(fetchOneQuestions({ question_id: id }))
  }, []);
  return (
    <div className="question-container">
      <div className="question_wrapper">
        <Question single_question={question?.question} />
        <div className="answers_container">
          <div className="answers_header">Answers</div>
          {answers?.length > 0 ? (
            answers.map((answer) => {
              return <Answers single_answer={answer} />;
            })
          ) : (
            <h6 style={{ textAlign: "center" }}>No answers yet</h6>
          )}
        </div>
        <AddAnswer />
      </div>
    </div>
  );
}

export default QuestionPage;
