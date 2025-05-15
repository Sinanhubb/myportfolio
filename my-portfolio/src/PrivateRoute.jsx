import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

// Simple PrivateRoute component
const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('admin_token');
        console.log("Token in PrivateRoute:", token);
        
        // Simple token validation
        const isValid = token && typeof token === 'string' && token.length > 20;
        console.log("Is token valid:", isValid);
        
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Return outlet (child components) if authenticated, otherwise redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateRoute;