import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const location = useLocation();
  
  // Get token from localStorage
  const token = localStorage.getItem('admin_token');
  
  // Debugger - Remove in production
  console.log("Current token:", token);
  
  // Token validation
  const isValidToken = 
    token &&
    typeof token === 'string' &&
    token.length > 30 &&
    !['undefined', 'null', 'dummy-token'].includes(token);
  
  // Debugger - Remove in production
  console.log("Is token valid:", isValidToken);
  
  // If token is valid, render the child routes (Outlet)
  // If not, redirect to login page
  return isValidToken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;