import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import {Home} from './views/Home';
import {Login} from './views/Login';

function App() {
  return (
    <div className="wrapper">
   <Router>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
   <Route path="/login" element={<Login/>}/> 
    </Routes>
   </Router>
    </div>
  )
}

export default App;
