import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://myportfolio-oflk.onrender.com';

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
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      setSubmissions(response.data);
    } catch (err) {
      console.error('API Error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config
      });

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Redirecting to login...');
        localStorage.removeItem('admin_token');
        setTimeout(() => window.location.href = '/admin-login', 2000);
      } else if (err.response?.status === 500) {
        if (retryCount < 3) {
          setError(`Server error. Retrying... (${retryCount + 1}/3)`);
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            fetchSubmissions();
          }, 2000);
        } else {
          setError('Server is currently unavailable. Please try again later.');
        }
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your connection.');
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to fetch submissions');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    fetchSubmissions();
  };

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
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            {!error.includes('Redirecting') && (
              <button 
                onClick={handleRetry}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Retry
              </button>
            )}
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
          submissions.map((submission) => (
            <div
              key={submission.id || submission.submitted_at}
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{submission.name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400">{submission.email}</p>
              <p className="my-2 whitespace-pre-wrap">{submission.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted at: {new Date(submission.submitted_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;