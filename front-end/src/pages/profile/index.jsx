import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AskQuestionCard, QuestionCard } from "../../components";
import {
  getUserAnswers,
  getUserComments,
  getUsersQuestions,
} from "../../redux/thunks/question.thunks";
export default function Profile() {
  let { questions, userAnswers, userComments } = useSelector(
    (state) => state.questions
  );
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const goToPrevious = () => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const goToNext = () => {
    setPage((prev) => prev + 1);
  };

  console.log(questions);
  useEffect(() => {
    dispatch(getUserAnswers());
    dispatch(getUserComments());
  }, []);

  useEffect(() => {
    if (!loading && !user?.id) {
      navigate(`/login?redirect=${pathname}`);
    }
  }, [user, loading]);

  useEffect(() => {
    dispatch(getUsersQuestions({ limit, page }));
  }, [page, limit]);
  return (
    <div className="profile_container">
      <div className="profile_header">
        <span className="profile_greetings">
          <h2>Welcome {user?.username}</h2>
        </span>
      </div>
      <div className="user_data">
        <div className="questions_no">
          <span className="stat">{questions?.total}</span>
          <span className="stat_title">Questions</span>
        </div>
        <div className="user_answers">
          <span className="stat">{userAnswers?.length}</span>
          <span className="stat_title">Answers </span>
        </div>
        <div className="user_comments">
          <span className="stat">{userComments?.length}</span>
          <span className="stat_title">comments</span>
        </div>
      </div>
      <div className="my_questions">
        <AskQuestionCard pageTitle={"Your questions"} />
        {questions?.data.length > 0 ? (
          <div>
            {questions?.data.map((question, index) => {
              return <QuestionCard single_question={question} key={index} />;
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
                Page {page} - {limit} of {questions?.total}
              </span>

              <button
                disabled={page >= Math.ceil(questions?.total / limit)}
                onClick={goToNext}
                className="next"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <h4>You have no questions</h4>
        )}
      </div>
    </div>
  );
}
