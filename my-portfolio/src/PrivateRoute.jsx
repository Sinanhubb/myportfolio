import React from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from './AdminLogin';

const PrivateRoute = ({ children }) => {
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