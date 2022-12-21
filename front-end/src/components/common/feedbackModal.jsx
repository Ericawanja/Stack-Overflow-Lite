import React from "react";
import { useDispatch } from "react-redux";
import { closeFeedbackModal } from "../../redux/slices/question.slice";

function FeedbackModal({text}) {
  const dispatch = useDispatch()

  return (
    <div className="feedbackModal">
      <span>{text}</span>
      <span className="feedbackModalClose" onClick={()=> dispatch(closeFeedbackModal())}>X</span>
    </div>
  );
}

export default FeedbackModal;
