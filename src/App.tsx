import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm'; 
import Dashboard from './pages/Dashboard';
import RegistrationSuccess from './pages/RegistrationSuccess';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;

