import React, { useState } from "react";

export default function AskQuestionCard({ pageTitle }) {
  const [openQForm, setOpenQForm] = useState(false);

  const [question_data, setQuestion] = useState({
    title: "",
    question: "",
    tags: [],
  });
  let {title, question} = question_data
  
  const handle_close = () => {
    setQuestion({ title: "", question: "", tags: [] });
    setOpenQForm(false);
  };
  const handle_input = (e) => {
    let name = e.target.name;
    let value = e.target.value;
  

    setQuestion({ ...question_data, [name]: value });
  };
  const handle_save = () => {
    //post data
    //send response
    
  };

  return (
    <div>
      <div className="page_title">
        <div className="question_title">{pageTitle}</div>
        <div className="ask_btn" onClick={() => setOpenQForm(true)}>
          Ask  <span>Question</span>
        </div>
      </div>
      {openQForm && (
        <div className="question_Form">
          <div className="Q-form">
            <h3>Ask Question</h3>
            <div className="form_wrapper">
              <label htmlFor="title">Enter the question title</label>
              <input type="text" id="title" name= 'title'value={title} onChange = {(event)=>handle_input(event)} />
              <label htmlFor="description">
                Enter details about the question
              </label>
              <textarea name="question" id="" cols="10" rows="5" value= {question} onChange = {(event)=>handle_input(event)}></textarea>
              <label htmlFor="tags">Enter the tags separated by comma</label>
              <input type="text" id="tags" name= 'tags'value={title} onChange = {(event)=>handle_input(event)} placeholder='javascript, reactjs'/>
              <div className="Q-form_btns">
                <div className="cancel">
                  <button onClick={() => handle_close()}>Cancel</button>
                </div>
                <div className="save">
                  <button onClick={() => handle_save()}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
