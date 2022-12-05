import React from "react";
import { useState } from "react";

import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Comment from "../comment";

function Answers({ single_answer }) {
  let { answer, comments, votes } = single_answer;
  let [commentForm, setCommentForm] = useState(false)

  return (
    <div className="answers_list">
      <div className="answer">
        <div className="answer_body">
          <div className="answer_votes">
            <div className="upvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiOutlineCaretUp />
              </IconContext.Provider>
            </div>
            <div className="votes">{votes}</div>
            <div className="downvote">
              <IconContext.Provider value={{ color: "#100720", size: "42px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>
          </div>
          <div className="answer_text">{answer}</div>
        </div>
       
        <div className="answer_comment">
          
          {comments.length > 0 ? (
            comments.map((comment ,index) => {
              return <Comment single_comment={comment} key={index}/>;
            })
          ) : (
            <h5>No comments found</h5>
          )}
          <div className="answer_comment_header">
            <div className="comment_header" onClick={()=>setCommentForm(!commentForm)}>Add Comment</div>
            {commentForm && <div className="add_comment">
              <span className="comment_input">
                <input type="text" />
              </span>
              <span className="comment_btn" onClick={()=>setCommentForm(false)}>Save</span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answers;
