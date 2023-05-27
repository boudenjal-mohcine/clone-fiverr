import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import GigsView from './views/GigsView';
import AddGig from './views/AddGig';
import GigDetails from './views/GigDetails';

  
function App() {
  return(
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' exact element={<GigsView/>} />
      <Route path='/gigs/add' element={<AddGig/>} />
      <Route path='/gigs/view/:id' element={<GigDetails/>} />

    </Routes>
  </Router>
  )
}

export default App;
