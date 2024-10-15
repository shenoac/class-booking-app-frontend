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

const App: React.FC = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
