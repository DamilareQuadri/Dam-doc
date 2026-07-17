import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SymptomInput from './pages/SymptomInput';
import Result from './pages/Result';
import DiagnosisHistory from './pages/DiagnosisHistory';
import HealthTips from './pages/HealthTips';
import SeeDoctor from './pages/SeeDoctor';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/symptoms" element={<PrivateRoute><SymptomInput /></PrivateRoute>} />
        <Route path="/result" element={<PrivateRoute><Result /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><DiagnosisHistory /></PrivateRoute>} />
        <Route path="/tips" element={<PrivateRoute><HealthTips /></PrivateRoute>} />
        <Route path="/see-doctor" element={<PrivateRoute><SeeDoctor /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
