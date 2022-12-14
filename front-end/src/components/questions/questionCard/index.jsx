import { Link, useNavigate } from "react-router-dom";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneQuestions } from "../../../redux/thunks/question.thunks";
import { useEffect } from "react";

function QuestionCard({ single_question, currentUser }) {
  let one_question = useSelector((state) => state.questions.question);
  let { question_id, user_id, title, question, tags, created_on, answers } =
    single_question;
  let sub_string = question.slice(0, 130);
  let tagsArr = tags.split(",");

  let createdOn = new Date(created_on).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dispatch = useDispatch();
  const fetchOneQuestion = () => {
    dispatch(fetchOneQuestions({ question_id }));
  };
 
 const navigate = useNavigate()
  useEffect(() => {
    if (one_question?.question) {
      navigate(`/questions/${question_id}`);
    }
   
  }, [one_question]);

  return (
    <div className="quiz_list">
      <div className="quiz_list_left">
        <span>{answers} Answers</span>
      </div>
      <div className="list_middle" onClick={fetchOneQuestion}>
        <div className="quiz_title">
          <span>{title}</span>
        </div>
        <div className="quiz_description">{sub_string}...</div>
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
                  <span className="edit">
                    <AiFillEdit style={{ fontSize: "16px" }} />
                  </span>
                  <span className="delete">
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
