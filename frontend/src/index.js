import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login/login'
import reportWebVitals from './reportWebVitals';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import RetailLogin from './components/retail/retailLogin';
import RetailHome from './components/retail/retailHome';
import RetailOrder from './components/retail/retailOrders';
import RetailProduct from './components/retail/retailProduct';
import RetailProfile from './components/retail/retailProfile';
import UserOrder from './components/UserOrder/userOrder'
import UserCart from './components/userCart/userCart'
import UserProfile from './components/UserProfile/userProfile'

import {BrowserRouter,Routes,Route} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login.Login />}/>
      <Route path="/login" element={<Login.Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/home" element={<Home.HomePage />}/>
      <Route path="/ShopResult/:ProductIndex" element={<Home.ShopResult />} />
      <Route path="/business" element={<RetailLogin.RetailLogin/>}/>
      <Route path="/retailDashboard" element={<RetailHome.RetailHome/>}/>
      <Route path="/retailOrder" element={<RetailOrder/>}/>
      <Route path="/retailProduct" element={<RetailProduct/>}/>
      <Route path="/retailProfile" element={<RetailProfile/>}/>
      <Route path="/userOrder" element={<UserOrder/>}/>
      <Route path="/userCart" element={<UserCart/>}/>
      <Route path="/userProfile" element={<UserProfile/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
