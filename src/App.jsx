import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './utils/ScrollToTop.jsx';

import Login from './components/Entry/Login.jsx';
import Reg from './components/Entry/Reg.jsx';
import Main from './components/Main/Main.jsx';
import Tables from './components/Tables/Tables.jsx';
import Order from './components/Order/Order.jsx';
import Profile from './components/Profile/Profile.jsx';
import Admin from './components/Admin/Admin.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/registration' element={<Reg/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/tables' element={<Tables/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </>
  )
}
