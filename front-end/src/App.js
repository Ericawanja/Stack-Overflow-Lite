import "./App.css";
//import LandingPage from "./components/LandingPage";
import "./components/styles.css";

import { Route, Routes } from "react-router-dom";
import{ Question, QuestionsList }from "./components";
import {QuestionsLayoutPage, QuestionsPage,LandingPage,LoginPage, SignupPage } from "./pages";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsLayoutPage />}>
          <Route index element={<QuestionsList />} />
          <Route path=":question_id" element={<Question />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
