import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  
  // Directly handle login without checking if already logged in
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      // Hardcoded credentials (move to environment variables in production)
      const adminUsername = 'admin';
      const adminPassword = 'admin123';
      
      if (username === adminUsername && password === adminPassword) {
        // Generate a strong token
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 15);
        const mockToken = `admin-${timestamp}-${randomStr}`;
        
        // IMPORTANT: Set token in localStorage
        console.log("Setting token:", mockToken);
        localStorage.setItem('admin_token', mockToken);
        
        // Clear form and errors
        setUsername('');
        setPassword('');
        setError('');
        
        // Add delay to ensure token is stored before navigation
        setTimeout(() => {
          console.log("Navigating after token set");
          console.log("Current token:", localStorage.getItem('admin_token'));
          navigate('/admin');
          window.location.reload(); // Force a full page reload to ensure new state
        }, 300);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;