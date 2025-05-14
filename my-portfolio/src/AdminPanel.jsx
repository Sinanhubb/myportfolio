import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate hook

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateToken = (token) => {
    return token && typeof token === 'string' && token.length > 30;
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    if (!validateToken(token)) {
      // If token is not valid, redirect to login page
      navigate('/admin-login');
      return;
    }

    // Fetching submission data (example)
    fetchSubmissions();
  }, [navigate]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      // Simulate API call here
      const mockData = [
        { name: 'John Doe', email: 'johndoe@example.com', message: 'Sample submission 1', submitted_at: new Date().toISOString() },
        { name: 'Jane Smith', email: 'janesmith@example.com', message: 'Sample submission 2', submitted_at: new Date().toISOString() },
      ];
      setSubmissions(mockData); // Set mock data for now
    } catch (err) {
      setError('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {!loading && submissions.length === 0 && (
          <p className="text-center text-gray-500">No submissions yet.</p>
        )}

        {!loading && submissions.length > 0 && (
          <div>
            {submissions.map((submission, index) => (
              <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow">
                <h2 className="font-semibold">{submission.name}</h2>
                <p className="text-blue-600">{submission.email}</p>
                <p className="mt-2">{submission.message}</p>
                <p className="text-sm text-gray-500">{new Date(submission.submitted_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
