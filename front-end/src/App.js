import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
  LandingPage,
  SignupPage,
  LoginPage,
  QuestionsLayoutPage,
  QuestionsPage,
  QuestionPage,
  ProfilePage,
} from "./pages";
import Profile from "./pages/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsLayoutPage />}>
          <Route index element={<QuestionsPage />} />
          <Route path="/questions/profile" element={<ProfilePage/>}/>
          <Route path=":id" element={<QuestionPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
