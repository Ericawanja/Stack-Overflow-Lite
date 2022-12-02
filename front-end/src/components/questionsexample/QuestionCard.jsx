import React from "react";

const QuestionCard = ({ question }) => {
  return (
    <div style={{ padding: "10px", border: "1px solid #eee", margin:"10px 0px" }}>
      <h2>{question?.title}</h2>
      <hr />
      <p>{question?.question}</p>
    </div>
  );
};

export default QuestionCard;
