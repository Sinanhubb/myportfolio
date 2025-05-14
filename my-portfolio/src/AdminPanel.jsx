import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE = 'https://your-api-url.com'; // Your API base URL

  // Validate if the token is still valid
  const validateToken = (token) => token && token.length > 20;

  const handleApiError = (err) => {
    console.error('API Error:', err);

    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin-login';
    } else {
      setError('Error fetching data. Please try again.');
    }
  };

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('admin_token');

      // Ensure token is valid before making an API request
      if (!validateToken(token)) {
        window.location.href = '/admin-login';
        return;
      }

      const response = await axios.get(`${API_BASE}/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        setSubmissions(response.data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  const filteredSubmissions = submissions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Admin Panel – {filteredSubmissions.length} Submissions</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search submissions..."
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="grid gap-4">
          {filteredSubmissions.map((submission) => (
            <div key={submission.id} className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h2 className="text-xl font-semibold">{submission.name}</h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{submission.email}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(submission.submitted_at), 'PPpp')}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-wrap">{submission.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
