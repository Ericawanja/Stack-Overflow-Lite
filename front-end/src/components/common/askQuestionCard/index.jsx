import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../../redux/thunks/question.thunks";
import Alert from "../alert";

export default function AskQuestionCard({ pageTitle }) {
  const [openQForm, setOpenQForm] = useState(false);

  const [newQuestion, setQuestion] = useState({
    title: "",
    question: "",
    tags: "",
  });

  const handleClose = () => {
    setQuestion({ title: "", question: "", tags: [] });
    setOpenQForm(false);
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setQuestion({ ...newQuestion, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log(error);
    dispatch(createQuestion(newQuestion));
    if (!error) {
      //handleClose();
      
    }
  };
  const { error } = useSelector((state) => state.questions);
  console.log(error);

  return (
    <div>
      <div className="page_title">
        <div className="question_title">{pageTitle}</div>
        <div className="ask_btn" onClick={() => setOpenQForm(true)}>
          Ask <span>Question</span>
        </div>
      </div>
      {openQForm && (
        <div className="question_Form">
          <div className="Q-form">
            <h3>Ask Question</h3>
            <div className="form_wrapper">
              <label htmlFor="title">Enter the question title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newQuestion.title}
                onChange={(event) => handleInput(event)}
              />
              <label htmlFor="description">
                Enter details about the question
              </label>
              <textarea
                name="question"
                id=""
                cols="10"
                rows="5"
                value={newQuestion.question}
                onChange={(event) => handleInput(event)}
              ></textarea>
              <label htmlFor="tags">Enter the tags separated by comma</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={newQuestion.tags}
                onChange={(event) => handleInput(event)}
                placeholder="javascript, reactjs"
              />
              {error && <Alert message={error} />}
              <div className="Q-form_btns">
                <div className="cancel">
                  <button onClick={() => handleClose()}>Cancel</button>
                </div>
                <div className="save">
                  <button onClick={() => handleSubmit()}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
