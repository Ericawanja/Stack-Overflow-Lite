import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Question, Answers, AddAnswer } from "../../components";
import { fetchOneQuestions } from "../../redux/thunks/question.thunks";

function QuestionPage() {
  const dispatch = useDispatch();
  const { question, loading } = useSelector((state) => state.questions);

  let answers = question?.question?.answers;
  const { id } = useParams();
 
  useEffect(() => {
    dispatch(fetchOneQuestions({ question_id: id }));
  }, []);
  return (
    <div className="question-container">
      {Object.keys(question).length !== 0 && (
        <div className="question_wrapper">
          <Question single_question={question?.question} />
          <div className="answers_container">
            <div className="answers_header">Answers</div>
            {answers?.length > 0 ? (
              answers.map((answer) => {
                return <Answers single_answer={answer}  key={answer.id}/>;
              })
            ) : (
              <h6 style={{ textAlign: "center" }}>No answers yet</h6>
            )}
          </div>
          <AddAnswer question_id={id} />
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
