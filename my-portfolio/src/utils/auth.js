// auth.js
/**
 * Utility functions for authentication
 */

// Constants
export const TOKEN_KEY = 'admin_token';

// Validate token function - used across components
export const isValidToken = (token) =>
  token &&
  typeof token === 'string' &&
  token.length > 30 &&
  !['undefined', 'null', 'dummy-token'].includes(token);

// Login function - creates and stores token
export const login = (username, password) => {
  const correctUsername = 'admin'; // Replace with environment variable in production
  const correctPassword = 'admin123'; // Replace with environment variable in production
  
  if (username === correctUsername && password === correctPassword) {
    // Generate a secure token
    const token = `admin-${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(TOKEN_KEY, token);
    return { success: true, token };
  }
  
  return { success: false, error: 'Invalid credentials' };
};

// Logout function - removes token
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return true;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return isValidToken(token);
};

// Get current token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export default {
  isValidToken,
  login,
  logout,
  isAuthenticated,
  getToken,
  TOKEN_KEY
};