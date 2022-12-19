import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
  AiFillCaretDown,
  AiOutlineCaretUp,
  AiOutlineClose,
} from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openCommentForm } from "../../../redux/slices/question.slice";
import {
  postComment,
  preferAnswer,
  voteAnswer,
} from "../../../redux/thunks/question.thunks";
import Comment from "../comment";

function Answers({ single_answer }) {
  const dispatch = useDispatch();
  const { comment, question } = useSelector((state) => state.questions);
  const { id } = useParams();
  let { answer, comments, votes } = single_answer;

  // let [user, setUser] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
 

  

  const handlePrefer = (status) => {
    dispatch(
      preferAnswer({
        status,
        answer_id: single_answer.id,
        question_id: id,
      })
    );
  };
  const handleVoting = (status) => {
    dispatch(
      voteAnswer({
        status,
        answer_id: single_answer.id,
        question_id: id,
      })
    );
  };

  return (
    <div className="answers_list">
      <div className="answer">
        <div className="answer_body">
          <div className="answer_votes">
            {single_answer.preferred && (
              <div className="preferred">preferred</div>
            )}
            <div className="upvote" onClick={() => handleVoting("upvote")}>
              <IconContext.Provider value={{ color: "#c2bfba", size: "32px" }}>
                <AiOutlineCaretUp />
              </IconContext.Provider>
            </div>
            <div className="votes">{votes}</div>
            <div className="downvote" onClick={() => handleVoting("downvote")}>
              <IconContext.Provider value={{ color: "#c2bfba", size: "32px" }}>
                <AiFillCaretDown />
              </IconContext.Provider>
            </div>

            {user?.id === question.question.user_id &&
              (!!!single_answer.preferred ? (
                <div className="prefer" onClick={() => handlePrefer("prefer")}>
                  <IconContext.Provider
                    value={{ color: "#c2bfba", size: "24px" }}
                  >
                    <FaCheck />
                  </IconContext.Provider>
                </div>
              ) : (
                <div
                  className="prefer"
                  onClick={() => handlePrefer("unprefer")}
                >
                  <IconContext.Provider
                    value={{ color: "#c2bfba", size: "24px" }}
                  >
                    <AiOutlineClose />
                  </IconContext.Provider>
                </div>
              ))}
          </div>
          <div>
            <div className="answer_text">{answer}</div>
            <div className="answer_comment">
              {comments.length > 0 &&
                comments.map((comment, index) => {
                  return <Comment single_comment={comment} key={index} />;
                })}
              <div className="answer_comment_header">
                <div
                  className="comment_header"
                  onClick={() => dispatch(openCommentForm({answer_id:single_answer.id, question_id:id}))}
                >
                 comment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answers;
