import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/submissions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
      .then((res) => setSubmissions(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = '/admin-login';
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = "/admin-login";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">📥 Admin Panel – Contact Submissions</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {submissions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No submissions yet.</p>
        ) : (
          submissions.map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md transition">
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
