import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Login from './Login.js';
import Home from './Home.js';
import CreateUser from './CreateUser.js';
import UserUpdate from './UserUpdate.js';
import ShopDetail from './ShopDetail.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path  = "/" element={<Login />} />
  <Route path  = "/login" element={<Login />} />
  <Route path  = "/Home" element={<Home />} />
  <Route path  = "/Create" element={<CreateUser />} />
  <Route path = "/Update/:id" element={<UserUpdate/>} />
  <Route path = "/Shop" element={<ShopDetail/>} />

  

  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
