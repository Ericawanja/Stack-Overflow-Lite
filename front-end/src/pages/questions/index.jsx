import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../../components/questions/QuestionCard";

import { fetchAllQuestions } from "../../redux/thunks/question.thunks";

const QuestionsPage = () => {
  const { questions, loading } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  return (
    <div>
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          {questions?.length === 0 ? (
            <div>No Questions Found</div>
          ) : (
            <div style={{padding:"20px"}}>
              {questions?.map((question, i) => (
                <QuestionCard key={i} question={question} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
