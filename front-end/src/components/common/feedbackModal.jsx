import React from "react";
import { useDispatch } from "react-redux";
import { closeFeedbackModal } from "../../redux/slices/question.slice";

function FeedbackModal({text}) {
  const dispatch = useDispatch()

  return (
    <div className="alertModal">
      <span>{text}</span>
      <span className="alertModalClose" onClick={()=> dispatch(closeFeedbackModal())}>X</span>
    </div>
  );
}

export default FeedbackModal;
