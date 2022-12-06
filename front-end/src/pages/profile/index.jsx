import { useSelector } from "react-redux";
import { QuestionCard } from "../../components";
export default function Profile() {
  let { questions } = useSelector((state) => state.questions);
  let user_name = "User Two";
  questions = questions.filter((question) => question.username === user_name);
 
  return (
    <div className="profile_container">
      <div className="profile_header">
        <span className="profile_greetings"><h2>Welcome back User</h2></span>
      </div>
      <div className="user_data">
        <div className="questions_no">
          <span className="stat">3456</span>
          <span className="stat_title">Questions</span>
        </div>
        <div className="user_answers">
          <span className="stat">3456</span>
          <span className="stat_title">Answers </span>
        </div>
        <div className="user_comments">
          <span className="stat">34</span>
          <span className="stat_title">comments</span>
        </div>
      </div>
      <div className="my_questions">
        <div className="myquestions_header">
          <span><h2>Your Questions</h2></span>
          <span className="order_questions">
            <select>
              <option value="" selected disabled>Order by</option>
              <option value="answer">Answers</option>
              <option value="recent">Recent</option>
            </select>
          </span>
        </div>
        {questions.map((question) => {
          return <QuestionCard single_question={question} />;
        })}
      </div>
    </div>
  );
}
