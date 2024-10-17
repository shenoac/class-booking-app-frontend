import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm'; 
import Dashboard from './pages/Dashboard';
import RegistrationSuccess from './pages/RegistrationSuccess';
import VerifyEmail from './pages/VerifyEmail';
import PasswordResetRequest from './pages/PasswordResetRequest';
import ResetPassword from './pages/ResetPassword';
import Classes from './pages/Classes';
import ArtistProfile from './pages/ArtistProfile';
import ArtistProfileUpdate from './pages/ArtistProfileUpdate';
import PasswordReset from './pages/PasswordReset';
import PaymentPage from './pages/PaymentPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QAoRmC5AAacvnwk9RJcn4ynCFBP1ap7YleGvRGPSoojGheWEB8AaKOsYIj5i6xD63Eb4OjofPdOeCcoOpLkAW6c00xxvn2M34');

const App: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password-request" element={<PasswordResetRequest />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/artist/:artistName" element={<ArtistProfile />} />
        <Route path="/artist/profile/update" element={<ArtistProfileUpdate />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
    </Elements>
  );
};

export default App;
