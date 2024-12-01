import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import ClientSignUp from './client/clientsignup';
import ClientHome from './client/clienthome';
import ClientPersonalProfile from './client/clientpersonalprofile';
import ClientReview from './client/clientreview';
import ClientAppointmentForm from './client/clientappointmentform';
import ClientUpdateProfile from './client/clientupdateprofile';

import LawyerSignUpForm from './lawyer/lawyersignupform';
import LawyerProfileInfo from './lawyer/lawyerprofileinfo';

import LandingPage from './landingpage';
import AdminLogin from './admin/adminlogin';
import AdminHome from './admin/adminhome';

import ProtectedRoute from './utils/protectedroute';
import LawyerProfile from './lawyer/lawyerprofile';
import LawyerAccount from './lawyer/lawyeraccount';
import LawyerClients from './lawyer/lawyerclients';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/civilify/landing-page" />} />

      {/*not protected*/}
      <Route path="/civilify/login-page" element={<Login />} />
      <Route path="/civilify/client-signup-page" element={<ClientSignUp />} />
      <Route path="/civilify/landing-page" element={ <LandingPage />}/>

      {/*Protected*/}
      <Route path="/civilify/client-home-page" element={<ClientHome />}/>
      <Route path="/civilify/client-profile-page" element={<ClientPersonalProfile />}/>
      <Route path="/civilify/client-review-page" element={<ClientReview />}/>
      <Route path="/civilify/client-appointment" element={<ClientAppointmentForm />}/>
      <Route path="/civilify/client-update-profile-page" element={<ClientUpdateProfile />}/>

      <Route path="/civilify/admin-login-page" element={<AdminLogin />}/>
      <Route path="/civilify/admin-home-page" element={<AdminHome />}/>

      <Route path="/civilify/lawyer-profile-page" element={<LawyerProfileInfo />} />
      <Route path="/civilify/lawyer-sign-up-form" element={<LawyerSignUpForm />}/>
      <Route path="/civilify/lawyer-profile" element={<LawyerProfile />}/>
      <Route path="/civilify/lawyer-accountsettings-page" element={<LawyerAccount/>}/>
      <Route path="/civilify/lawyer-client-page" element={<LawyerClients/>}/>

    </Routes>
  );
}

export default AppRoutes;
