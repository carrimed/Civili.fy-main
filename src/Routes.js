import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLogin from './client/clientlogin';
import ClientSignUp from './client/clientsignup';
import ClientHome from './client/clienthome';
import ClientAccount from './client/clientaccount';
import ClientCase from './client/clientcase';
import ClientReview from './client/clientreview';
import ClientAppointment from './client/clientappointment';

import LawyerLogin from './lawyer/lawyerlogin';
import LawyerSignUp from './lawyer/lawyersignup';
import LawyerHome from './lawyer/lawyerhome';
import LawyerAccount from './lawyer/lawyeraccount';
import LawyerMessages from './lawyer/lawyermessages';
import LawyerClients from './lawyer/lawyerclients';
import LawyerRatings from './lawyer/lawyerratings';
import Landing from './landing';
//ketn imnita
import Landing from './landingpage';

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

    </Routes>
  )
}

export default AppRoutes;
