import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a reusable function for token validation
export const validateToken = (token) =>
  token &&
  typeof token === 'string' &&
  token.length > 30 &&
  !['undefined', 'null', 'dummy-token'].includes(token);

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (validateToken(token)) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
      // Generate a token that will pass validation (length > 30)
      const mockToken = `admin-${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
      
      // Store in localStorage
      localStorage.setItem('admin_token', mockToken);
      
      setUsername(''); // Clear form inputs
      setPassword('');
      setError(''); 
      
      // Use the navigate function instead of direct window.location
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (error) setError(''); // Clear error when user types
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;