import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = (() => {
    if (import.meta.env?.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL;
    }
    if (window.location.hostname.includes('netlify')) {
      return 'https://myportfolio-oflk.onrender.com';
    }
    return 'http://localhost:5000';
  })();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('admin_token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_BASE}/api/submissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000, // 10 second timeout
        });

        setSubmissions(response.data);
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          code: err.code,
          response: err.response?.data,
        });

        // Detailed error handling
        if (err.response) {
          // Handle server-side errors
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'An error occurred'}`);
        } else if (err.code === 'ECONNABORTED') {
          setError('Request timeout. Please check your connection.');
        } else if (err.message === 'Network Error') {
          setError('Cannot connect to server. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [API_BASE]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">
          📥 Admin Panel – {loading ? '...' : submissions.length} 
          Submission{submissions.length !== 1 && 's'}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No submissions yet.
          </p>
        ) : (
          submissions.map((s) => (
            <div
              key={s.id || `${s.email}-${s.submitted_at}`}
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{s.name}</h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400 break-all">
                    {s.email}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(s.submitted_at).toLocaleString()}
                </p>
              </div>
              <p className="mt-3 whitespace-pre-wrap">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
