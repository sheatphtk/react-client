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
import Shop from './Shop.js';
import CreateShop from './CreateShop.js';
import User from './User.js';
import Banner from './Banner.js';
import CreateBanner from './CreateBanner.js';
import BannerUpdate from './BannerUpdate.js';
import UpdateShop from './UpdateShop.js';
import Register from './Register.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path = "/" element={<Login />} />
  <Route path = "/login" element={<Login />} />
  <Route path = "/Home" element={<Home />} />
  <Route path = "/Create" element={<CreateUser />} />
  <Route path = "/Update/:id" element={<UserUpdate/>} />
  <Route path = "/Shop" element={<Shop/>} />
  <Route path = "/CreateShop" element={<CreateShop/>} />
  <Route path = "/ShopDetail/:id" element = {<ShopDetail/>} />
  <Route path = "/UserList" element = {<User/>} />
  <Route path = "/Banner" element = {<Banner/>}/>
  <Route path = "/CreateBanner" element = {<CreateBanner/>}/>
  <Route path = "/BannerUpdate/:id" element = {<BannerUpdate/>}/>
  <Route path = "/UpdateShop/:id" element = {<UpdateShop/>}/>
  <Route path = "/Register" element = {<Register/>}/>

  
  

  

  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
