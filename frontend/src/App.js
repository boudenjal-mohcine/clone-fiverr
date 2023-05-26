import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import GigsView from './views/GigsView';
import AddGig from './views/AddGig';
  
function App() {
  return(
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' exact element={<GigsView/>} />
      <Route path='/gigs/add' element={<AddGig/>} />
    </Routes>
  </Router>
  )
}

export default App;
