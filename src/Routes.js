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
import ProtectedRoute from './utils/protectedroute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/civilify/landing-page" />} />

      {/*not protected*/}
      <Route path="/civilify/client-login-page" element={<ClientLogin />} />
      <Route path="/civilify/client-signup-page" element={<ClientSignUp />} />
      <Route path="/civilify/landing-page" element={ <LandingPage />}/>

      {/*Protected*/}
      <Route path="/civilify/client-home-page" element={<ProtectedRoute> <ClientHome /></ProtectedRoute>}/>
      <Route path="/civilify/client-account-page" element={<ProtectedRoute> <ClientAccount /></ProtectedRoute>}/>
      <Route path="/civilify/client-case-page" element={<ProtectedRoute> <ClientCase /></ProtectedRoute>}/>
      <Route path="/civilify/client-review-page" element={<ProtectedRoute> <ClientReview /></ProtectedRoute>}/>
      <Route path="/civilify/client-appointment-page" element={<ProtectedRoute> <ClientAppointment /></ProtectedRoute>}/>
      <Route path="/civilify/profile-page" element={<ProtectedRoute> <ProfileDisplay /></ProtectedRoute>}/>
      <Route path="/civilify/admin-login-page" element={<ProtectedRoute> <AdminLogin /></ProtectedRoute>}/>
      <Route path="/civilify/admin-home-page" element={<ProtectedRoute> <AdminHome /></ProtectedRoute>}/>
    </Routes>
  );
}

export default AppRoutes;
