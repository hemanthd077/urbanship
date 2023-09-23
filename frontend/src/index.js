import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login/login'
import reportWebVitals from './reportWebVitals';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import Retail from './components/retailLogin/retailLogin';
import {BrowserRouter,Routes,Route} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login.Login />}/>
      <Route path="/login" element={<Login.Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/home" element={<Home.HomePage />}/>
      <Route path="/retailnav" element={<Retail.RetailHome/>}/>
      <Route path="/business" element={<Retail.RetailLogin/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
