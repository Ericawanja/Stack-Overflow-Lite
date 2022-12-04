import questionReducer from "./question.slice";
import userReducer from "./user.slice";

const reducer = {
  questions: questionReducer,
  user:userReducer
};

export default reducer;
