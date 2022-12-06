import "./App.css"
import "./styles.css";


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


function App() {
  console.log(process.env.NODE_ENV );
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsLayoutPage />}>
          <Route index element={<QuestionsPage list='all'/>} />
          <Route path="/questions/users-questions" element={<QuestionsPage list='users'/>} />
          <Route path="/questions/profile" element={<ProfilePage/>}/>
          <Route path=":id" element={<QuestionPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
