import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillEdit, AiFillDelete,AiOutlineUser } from "react-icons/ai";

function QuestionCard({ single_question }) {
  console.log(single_question);
  let { id, username, title, question,  created_on, votes } =
    single_question;
  let sub_string = question.slice(0, 130);
  let tags = [1,2]

  //dummy user
  let user_name = "User Two";
  return (
    <div className="quiz_list">
      <div className="quiz_list_left">
        <span>{votes} votes</span>
        <span>0 Answers</span>
      </div>
      <div className="list_middle">
        <div className="quiz_title">
          <Link to={`/questions/${id}`}>{title}</Link>
        </div>
        <div className="quiz_description">{sub_string}...</div>
        <div className="quiz_list_details">
          <div className="tags">
            {tags.map((tag) => {
              return <span  >tag</span>;
            })}
          </div>
          {user_name !== username ? (
            <div className="quiz_creation_details">
              <span className="author">
                  <AiOutlineUser style={{fontSize:"16px"}} />
                {username}
              </span>
              <span className="date_created">{created_on}</span>
            </div>
          ) : (
            <div>
              <div className="quiz_creation_details">
                <span className="author_btns">
                  <span className="edit">
                      <AiFillEdit  style={{fontSize:"16px"}} />
                  </span>
                  <span className="delete">
                      <AiFillDelete  style={{fontSize:"16px"}} />
                  </span>
                </span>
                <span className="date_created">{created_on}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default QuestionCard;
