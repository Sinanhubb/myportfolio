import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check for valid token (shorter than mock token)
  const isValidToken = (token) =>
    token && typeof token === 'string' && token.length > 10;

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (isValidToken(token)) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://myportfolio-oflk.onrender.com/api/admin/login',
        {
          username,
          password,
        }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem('admin_token', token);
        setUsername('');
        setPassword('');
        setError('');
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid server response');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Check username/password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (error) setError('');
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
