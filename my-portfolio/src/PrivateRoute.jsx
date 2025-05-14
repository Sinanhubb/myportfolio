import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Match the validateToken function from AdminPanel.jsx exactly
  const validateToken = (token) =>
    token &&
    typeof token === 'string' &&
    token.length > 30 &&
    !['undefined', 'null', 'dummy-token'].includes(token);

  const token = localStorage.getItem('admin_token');
  const isAuthenticated = validateToken(token);

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/admin-login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default PrivateRoute;