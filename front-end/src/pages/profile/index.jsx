import { useEffect } from "react";
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
  const {pathname} = useLocation()

  useEffect(() => {
    dispatch(getUserAnswers());
    dispatch(getUserComments());
    dispatch(getUsersQuestions());
  }, []);

  useEffect(() => {
    if (!loading && !user?.id) {
      navigate(`/login?redirect=${pathname}`);
    }
  }, [user, loading]);

  return (
    <div className="profile_container">
      <div className="profile_header">
        <span className="profile_greetings">
          <h2>Welcome {user?.username}</h2>
        </span>
      </div>
      <div className="user_data">
        <div className="questions_no">
          <span className="stat">{questions?.data?.length}</span>
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
        {questions?.data.map((question) => {
          return <QuestionCard single_question={question} />;
        })}
      </div>
    </div>
  );
}
