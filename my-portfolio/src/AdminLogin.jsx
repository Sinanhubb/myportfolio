import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = (() => {
    if (import.meta.env?.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
    if (window.location.hostname.includes('netlify')) return 'https://myportfolio-oflk.onrender.com';
    return 'http://localhost:5000';
  })();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('admin_token');
        if (!token) throw new Error('No authentication token found');

        const { data } = await axios.get(`${API_BASE}/api/submissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });

        const formatted = data.map((sub) => ({
          ...sub,
          submitted_at: sub.submitted_at || sub.created_at || new Date().toISOString(),
        }));

        setSubmissions(formatted);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`);
        } else if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Server might be busy.');
        } else if (err.message === 'Network Error') {
          setError('Cannot connect to server. Check your internet connection.');
        } else {
          setError(err.message || 'Failed to load submissions.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [API_BASE]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            📥 Admin Panel – {loading ? '...' : submissions.length} Submission{submissions.length !== 1 && 's'}
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="animate-pulse p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
              </div>
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No submissions yet.</p>
        ) : (
          <div className="grid gap-6">
            {submissions.map((s) => (
              <div
                key={s.id || `${s.email}-${s.submitted_at}`}
                className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between flex-wrap gap-2 items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{s.name}</h2>
                    <p className="text-sm text-blue-600 dark:text-blue-400 break-all">{s.email}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(s.submitted_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-3 whitespace-pre-wrap">{s.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
