import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentForm } from "../../redux/slices/question.slice";
import { postComment } from "../../redux/thunks/question.thunks";
import Alert from "../common/alert";

function CommentForm() {
  const dispatch = useDispatch();
  const { comment, commentDetails, commentError } = useSelector((state) => state.questions);
  const { question_id, answer_id } = commentDetails;
  let [commentText, setComment] = useState("");
  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    let comment = { answer_id, comment: commentText };
    dispatch(postComment({ comment, question_id }));
  };

  const handleCloseCommentForm =()=>{
    setComment=""
    dispatch(closeCommentForm())
  }

  return (
    <div className="commentFormContainer">
      {comment && (
        <div className="commentForm">
          <div className="commentFormInputFields">
            <div className="CformHeader">Enter the comment</div>
           {commentError&& <Alert message={commentError}/>}
            <div className="commentInput">
              <textarea
                type="text"
                name="commentInput"
                value={commentText}
                rows={10}
                cols={50}
                onChange={handleCommentInput}
              />
            </div>
            <div className="comment_btns">
              <button onClick = {handleCloseCommentForm}>Cancel</button>
              <button onClick={handleSubmitComment}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
