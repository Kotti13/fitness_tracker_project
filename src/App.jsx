import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import TrainerLogin from './pages/TrainerLogin';
import TrainerSignup from './pages/TrainerSignup';
import TrainerDashboard from './pages/TrainerDashboard';
import Dashboard from './pages/UserDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/trainer/login" element={<TrainerLogin />} />
        <Route path="/trainer/signup" element={<TrainerSignup />} />
        <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
         <Route path="/userdashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;