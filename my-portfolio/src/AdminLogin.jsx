import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/admin-login', { email, password });

      // Assuming the response contains a token
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        navigate('/admin-panel');  // Redirect to the admin panel after login
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError('Invalid credentials, please try again.');
      } else {
        setError('Something went wrong, please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4 text-gray-800 dark:text-white">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-600 dark:text-red-400 text-center">
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white rounded-lg transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
