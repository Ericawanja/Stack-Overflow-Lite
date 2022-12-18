import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(getUserAnswers());
    dispatch(getUserComments());
    dispatch(getUsersQuestions());
  }, []);

  return (
    <div className="profile_container">
      <div className="profile_header">
        <span className="profile_greetings">
          <h2>Welcome back User</h2>
        </span>
      </div>
      <div className="user_data">
        <div className="questions_no">
          <span className="stat">{questions.length}</span>
          <span className="stat_title">Questions</span>
        </div>
        <div className="user_answers">
          <span className="stat">{userAnswers.length}</span>
          <span className="stat_title">Answers </span>
        </div>
        <div className="user_comments">
          <span className="stat">{userComments.length}</span>
          <span className="stat_title">comments</span>
        </div>
      </div>
      <div className="my_questions">
        {/* <div className="myquestions_header">
          <span>
            <h2>Your Questions</h2>
          </span>
          <span className="order_questions">
            <select>
              <option value="" selected disabled>
                Order by
              </option>
              <option value="answer">Answers</option>
              <option value="recent">Recent</option>
            </select>
          </span>
        </div> */}
        <AskQuestionCard pageTitle={"Your questions"}/>
        {questions.map((question) => {
          
          return <QuestionCard single_question={question} />;
        })}
      </div>
    </div>
  );
}
