import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  const isAuthenticated = token && token !== 'undefined' && token !== 'null';

  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
};

export default PrivateRoute;
