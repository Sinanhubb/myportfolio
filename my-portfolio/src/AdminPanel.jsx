import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fallback to localhost only if env variable is undefined
  const API_BASE =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL
      : 'http://localhost:5000';

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(`${API_BASE}/api/submissions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(response.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = '/admin-login';
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
          📥 Admin Panel – {submissions.length} Submission{submissions.length !== 1 && 's'}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No submissions yet.</p>
        ) : (
          submissions.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400">{s.email}</p>
              <p className="my-2">{s.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted at: {new Date(s.submitted_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
