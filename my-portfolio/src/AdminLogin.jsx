import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://myportfolio-oflk.onrender.com'; // Backend API base URL

  // Fetch submissions from the backend
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('admin_token');
      if (!token) {
        setError('Session expired. Please log in again.');
        return;
      }

      const response = await axios.get(`${API_BASE}/api/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`, // Passing token in the header
        },
      });

      setSubmissions(response.data); // Set the fetched submissions to state
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError('Failed to fetch submissions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, []); // Empty array means it will only run once, like componentDidMount

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login'; // Redirect to login after logout
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">
          📥 Admin Panel – {loading ? '...' : submissions.length}{' '}
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
              onClick={fetchSubmissions}
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
              key={s.id || `${s.email}-${s.submitted_at}`} // Better key
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
