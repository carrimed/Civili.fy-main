import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLogin from './client/clientlogin';
import ClientSignUp from './client/clientsignup';
import ClientHome from './client/clienthome';
import ClientAccount from './client/clientaccount';
import ClientCase from './client/clientcase';
import ClientReview from './client/clientreview';
import ClientAppointment from './client/clientappointment';

import Landing from './landingpage';
import AppointmentForm from './client/appointmentform';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/civilify/landing-page" />} />
      <Route path="/civilify/landing-page" element={<Landing />} />
      <Route path="/civilify/client-login-page" element={<ClientLogin />} />
      <Route path="/civilify/client-signup-page" element={<ClientSignUp />} />
      <Route path="/civilify/client-home-page" element={<ClientHome />} />
      <Route path="/civilify/client-account-page" element={<ClientAccount />} />
      <Route path="/civilify/client-case-page" element={<ClientCase />} />
      <Route path="/civilify/client-review-page" element={<ClientReview />} />
      <Route path="/civilify/client-appointment-page" element={<ClientAppointment />} />
      <Route path="/civilify/client-appointmentform" element={<AppointmentForm/>} />
    </Routes>
  )
}

export default AppRoutes;
