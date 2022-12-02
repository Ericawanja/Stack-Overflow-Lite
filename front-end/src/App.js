import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  SignupPage,
  LoginPage,
  QuestionsLayoutPage,
  QuestionsPage,
  QuestionPage,
} from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsLayoutPage />}>
          <Route index element={<QuestionsPage />} />
          <Route path=":question_id" element={<QuestionPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
