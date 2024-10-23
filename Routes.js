import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import Account from './components/account';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/loginpage" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default AppRoutes;
