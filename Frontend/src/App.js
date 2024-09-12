import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './components/Home/Homepage'
import LoginPage from './components/Register/LoginPage';
import SignupPage from './components/Register/SignupPage';
import Chatbot from './components/Chatbot/Chatbot';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import Feedback from './components/Feedback/Feedback';
import './App.css';

function App() {

  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatbot" element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feedback" element={isAuthenticated ? <Feedback /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
