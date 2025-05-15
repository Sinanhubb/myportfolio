// src/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isValidToken } from './utils/auth';

const PrivateRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem('admin_token');

  if (!isValidToken(token)) {
    localStorage.removeItem('admin_token');
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
