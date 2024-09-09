import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Get JWT from localStorage

  // Redirect to login if no token is found
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render the passed element (like Chatbot) if token exists
  return element;
};

export default ProtectedRoute;
