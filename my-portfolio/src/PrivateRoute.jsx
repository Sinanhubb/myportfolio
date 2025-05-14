import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem('admin_token');

  // Token validation
  const isValidToken =
    token &&
    typeof token === 'string' &&
    token.length > 30 &&
    !['undefined', 'null', 'dummy-token'].includes(token);

  return isValidToken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin-login" state={{ from: location }} replace />
  );
};
