import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAnsForm, openAnsForm, openQUestionForm } from "../../../redux/slices/question.slice";
import { postAnswer } from "../../../redux/thunks/question.thunks";
import Alert from "../../common/alert";

function AddAnswer({ question_id }) {
  const dispatch = useDispatch();
  const {error, ansForm} = useSelector(state=>state.questions)
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = () => {
    dispatch(postAnswer({ question_id, answer}))
    if(answer.trim() !=="" && answer.length >3){
      setAnswer('')
    }
    
  };
  return (
    <div className="form_answer_container">
      <h3 onClick={()=> dispatch(openAnsForm())}>Add a answer</h3>
      {error && <Alert message= {error}/>}
     { ansForm &&<>
      <div className="answer_form">
        <textarea
          name="answer"
          id=""
          cols="50"
          rows="5"
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </div>
      <div className="answer_save_btn">
        <button onClick={()=>dispatch(closeAnsForm())}>Close</button>
        <button onClick={() => handleAnswerSubmit()}>save</button>
      </div>
      </>}
    </div>
  );
}
export default AddAnswer;
