import "./App.css";
import LandingPage from "./components/LandingPage";
import "./components/styles.css";

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuestionLayout from "./components/QuestionLayout";
import QuestionsList from "./components/QuestionsList";
import Question from "./components/Question";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<QuestionLayout />}>
          <Route index element={<QuestionsList />} />
          <Route path=":question_id" element={<Question />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
