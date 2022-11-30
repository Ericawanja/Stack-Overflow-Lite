
import './App.css';
import LandingPage from './components/LandingPage';
import  './components/styles.css';

import { Route, Routes } from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={ <LandingPage/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/signup' element={ <Signup/>}/>
    </Routes>
   
    </>
  );
}

export default App;
