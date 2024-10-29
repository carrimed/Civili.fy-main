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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing-page" />} />
      <Route path="/landing-page" element={<Landing />} />
      <Route path="/client-login-page" element={<ClientLogin />} />
      <Route path="/client-signup-page" element={<ClientSignUp />} />
      <Route path="/client-home-page" element={<ClientHome />} />
      <Route path="/client-account-page" element={<ClientAccount />} />
      <Route path="/client-case-page" element={<ClientCase />} />
      <Route path="/client-review-page" element={<ClientReview />} />
      <Route path="/client-appointment-page" element={<ClientAppointment />} />
      
      <Route path="/lawyer-login-page" element={<LawyerLogin />} />
      <Route path="/lawyer-signup-page" element={<LawyerSignUp />} />
      <Route path="/lawyer-home-page" element={<LawyerHome />} />
      <Route path="/lawyer-account-page" element={<LawyerAccount />} />
      <Route path="/lawyer-messages-page" element={<LawyerMessages />} />
      <Route path="/lawyer-clients-page" element={<LawyerClients />} />
      <Route path="/lawyer-ratings-page" element={<LawyerRatings />} />
      
    </Routes>
  )
}

export default AppRoutes;
