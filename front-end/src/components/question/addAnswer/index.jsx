function AddAnswer() {
  return (
    <div className="form_answer_container">
      <h3>Add a answer</h3>
      <div className="answer_form">
        <textarea
          name="answer"
          id=""
          cols="50"
          rows="5"
          placeholder="Answer..."
        ></textarea>
      </div>
      <div className="answer_save_btn">
        <button>save</button>
      </div>
    </div>
  );
}
export default AddAnswer;
