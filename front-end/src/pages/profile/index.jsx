import { useSelector } from "react-redux";
import { QuestionCard } from "../../components";
export default function Profile() {
  const { questions } = useSelector((state) => state.questions);
  console.log(questions);
  return (
    <div className="profile_container">
      <div className="profile_header">
        <span className="profile_greetings"><h2>Welcome back User</h2></span>
      </div>
      <div className="user_data">
        <div className="questions_no">
          <span className="stat">3456</span>
          <span className="stat_title">Questions asked</span>
        </div>
        <div className="user_answers">
          <span className="stat">3456</span>
          <span className="stat_title">Answers given</span>
        </div>
        <div className="user_comments">
          <span className="stat">34</span>
          <span className="stat_title">Your comments</span>
        </div>
      </div>
      <div className="my_questions">
        <h2>Your Questions</h2>
        {questions.map((question) => {
          return <QuestionCard single_question={question} />;
        })}
      </div>
    </div>
  );
}
