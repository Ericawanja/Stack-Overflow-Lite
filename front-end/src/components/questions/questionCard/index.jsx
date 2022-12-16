import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsEditingTrue } from "../../../redux/slices/question.slice";

import {
  deleteQuestion,
  fetchOneQuestions,
} from "../../../redux/thunks/question.thunks";

function QuestionCard({ single_question, currentUser }) {
  const dispatch = useDispatch();
  let { question_id, user_id, title, question, tags, created_on, answers } =
    single_question;
  let sub_string = question.slice(0, 130);
  let tagsArr = tags.split(",");

  let createdOn = created_on
    ? new Date(created_on).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : created_on;

  const navigate = useNavigate();
  const navigateToQuestion = () => {
    navigate(`/questions/${question_id}`);
  };

  return (
    <div className="quiz_list">
      <div className="quiz_list_left">
        <span>{answers} Answers</span>
      </div>
      <div className="list_middle" /*onClick={navigateToQuestion}*/>
        <div className="quiz_title" onClick={navigateToQuestion}>
          <span>{title}</span>
        </div>
        <div className="quiz_description" onClick={navigateToQuestion}>{sub_string}...</div>
        <div className="quiz_list_details">
          <div className="tags">
            {tagsArr.map((tag, index) => {
              return <span key={index}>{tag}</span>;
            })}
          </div>
          {currentUser.id !== user_id ? (
            <div className="quiz_creation_details">
              <span className="author">
                {/* <AiOutlineUser style={{ fontSize: "16px" }} />
                {username} */}
                Posted on:
              </span>
              <span className="date_created">{createdOn}</span>
            </div>
          ) : (
            <div>
              <div className="quiz_creation_details">
                <span className="author_btns">
                  <span
                    className="edit"
                    onClick={() => dispatch(setIsEditingTrue(single_question))}
                  >
                    <AiFillEdit style={{ fontSize: "16px" }} />
                  </span>
                  <span
                    className="delete"
                    onClick={() => dispatch(deleteQuestion(question_id))}
                  >
                    <AiFillDelete style={{ fontSize: "16px" }} />
                  </span>
                </span>
                <span className="date_created">{createdOn}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default QuestionCard;
