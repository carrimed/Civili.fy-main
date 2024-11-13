import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLogin from './client/clientlogin';
import ClientSignUp from './client/clientsignup';
import ClientHome from './client/clienthome';
import ClientAccount from './client/clientaccount';
import ClientCase from './client/clientcase';
import ClientReview from './client/clientreview';
import ClientAppointment from './client/clientappointment';
import ProfileDisplay from './client/profile';
import LandingPage from './landingpage';

import AdminLogin from './admin/adminlogin';
import AdminHome from './admin/adminhome';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/civilify/landing-page" />} />
      <Route path="/civilify/landing-page" element={<LandingPage />} />
      <Route path="/civilify/client-login-page" element={<ClientLogin />} />
      <Route path="/civilify/client-signup-page" element={<ClientSignUp />} />
      <Route path="/civilify/client-home-page" element={<ClientHome />} />
      <Route path="/civilify/client-account-page" element={<ClientAccount />} />
      <Route path="/civilify/client-case-page" element={<ClientCase />} />
      <Route path="/civilify/client-review-page" element={<ClientReview />} />
      <Route path="/civilify/client-appointment-page" element={<ClientAppointment />} />
      <Route path="/civilify/profile-page" element={<ProfileDisplay />} />

      <Route path="/civilify/admin-login-page" element={<AdminLogin />} />
      <Route path="/civilify/admin-home-page" element={<AdminHome />} />

    </Routes>
  )
}

export default AppRoutes;
