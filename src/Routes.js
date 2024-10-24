import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import Account from './components/account';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loginpage" />} />
      <Route path="/login-page" element={<Login />} />
      <Route path="/signup-page" element={<SignUp />} />
      <Route path="/home-page" element={<Home />} />
      <Route path="/account-page" element={<Account />} />
    </Routes>
  );
}

export default AppRoutes;
