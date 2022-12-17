import React from "react";
import { useState } from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openCommentForm } from "../../../redux/slices/question.slice";
import { postComment } from "../../../redux/thunks/question.thunks";
import Comment from "../comment";

function Answers({ single_answer }) {
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.questions);
  const {id} = useParams()
  let { answer, comments, votes } = single_answer;
  let [commentText, setComment] = useState("")
  const handleCommentInput =(e)=>{
    setComment(e.target.value)
  }

  const handleSubmitComment = () => {
    let comment = {answer_id: single_answer.id, comment:commentText}
    dispatch(postComment ({comment, question_id:id}))
  };
  return (
    <div className="answers_list">
      <div className="answer">
        <div className="answer_body">
          <div className="answer_votes">
            <div className="upvote">
              <IconContext.Provider value={{ color: "#100720", size: "24px" }}>
                <AiOutlineCaretUp />
              </IconContext.Provider>
            </div>
            <div className="votes">100</div>
            <div className="downvote">
              <IconContext.Provider value={{ color: "#100720", size: "24px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>
            <div className="downvote">
              <IconContext.Provider value={{ color: "#100720", size: "24px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>
           
          </div>
          <div className="answer_text">{answer}</div>
        </div>

        <div className="answer_comment">
          {comments.length > 0 &&
            comments.map((comment, index) => {
              return <Comment single_comment={comment} key={index} />;
            })}
          <div className="answer_comment_header">
            <div
              className="comment_header"
              onClick={() => dispatch(openCommentForm())}
            >
              {comment ? "Close" : "Comment"}
            </div>
            {comment && (
              <div className="add_comment">
                <span className="comment_input">
                  <input
                    type="text"
                    name="commentInput"
                    value={commentText}
                    onChange={handleCommentInput}
                  />
                </span>
                <span className="comment_btn" onClick={handleSubmitComment}>
                  Save
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answers;
