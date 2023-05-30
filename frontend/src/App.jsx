import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import InputGigView from './views/InputGigView';
import Footer from './components/Footer';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import BecomeSellerView from './views/BecomeSellerView';
import SellerProfileView from './views/SellerProfileView';
import HomeView from './views/HomeView';
import GigDetailsView from './views/GigDetailsView';
import GigsByCategoryView from './views/GigsByCategoryView';
import OrdersView from './views/OrdersView';
import ClientOrdersView from './views/ClientOrdersView';
  
function App() {
  return(
  <Router>
    <Navbar />
    <Routes>
      <Route path='/' exact element={<HomeView/>} />
      <Route path='/cat/:catId' exact element={<GigsByCategoryView/>} />
      <Route path='/gigs/add' element={<InputGigView/>} />
      <Route path='/gigs/edit/:gigId' element={<InputGigView/>} />
      <Route path='/seller/:sellerId' element={<SellerProfileView/>} />
      <Route path='/login' element={<LoginView/>} />
      <Route path='/register' element={<RegisterView/>} />
      <Route path='/user/beseller' element={<BecomeSellerView/>} />
      <Route path='/gigs/:gigId' element={<GigDetailsView/>} />
      <Route path='/orders' element={<OrdersView/>} />
      <Route path='/orders/:gigId' element={<ClientOrdersView/>} />
    </Routes>
    <Footer/>
  </Router>
  )
}

export default App;
