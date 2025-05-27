import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiMode, setApiMode] = useState('live');

  const API_BASE = 'https://myportfolio-oflk.onrender.com';

  const isValidToken = (token) => token && typeof token === 'string' && token.length > 10;

  const loadMockData = useCallback(() => {
    const mockData = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Nice portfolio!',
        submitted_at: new Date().toISOString(),
      },
    ];
    setSubmissions(mockData);
    setLoading(false);
  }, []);

  const handleApiError = useCallback((err) => {
    console.error('API Error:', err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin-login';
    } else {
      setError(err.message || 'Something went wrong');
      setApiMode('mock');
      loadMockData();
    }
  }, [loadMockData]);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');

      if (!isValidToken(token)) {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin-login';
        return;
      }

      if (apiMode === 'mock') {
        loadMockData();
        return;
      }

      const response = await axios.get(`${API_BASE}/api/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      if (Array.isArray(response.data)) {
        const formatted = response.data.map((sub) => ({
        
          id: sub.id || `${sub.email}-${Date.now()}`,
          submitted_at: sub.submitted_at || sub.created_at || new Date().toISOString(),
        }));
        setSubmissions(formatted);
      } else {
        throw new Error('Invalid data format from server');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE, apiMode, handleApiError, loadMockData]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!isValidToken(token)) {
      window.location.href = '/admin-login';
    } else {
      fetchSubmissions();
    }
  }, [fetchSubmissions]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin-login';
  };

  const filteredSubmissions = submissions.filter((sub) =>
    [sub.name, sub.email, sub.message].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Message', 'Date'];
    const csv = [
      headers.join(','),
      ...filteredSubmissions.map((s) =>
        `"${s.name.replace(/"/g, '""')}","${s.email}","${s.message.replace(/"/g, '""')}","${format(new Date(s.submitted_at), 'PPpp')}"`
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleApiMode = () => {
    const nextMode = apiMode === 'live' ? 'mock' : 'live';
    setApiMode(nextMode);
    setError(null);
    if (nextMode === 'mock') {
      loadMockData();
    } else {
      fetchSubmissions();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            Admin Panel – {loading ? 'Loading...' : `${filteredSubmissions.length} Submissions`}
          </h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={fetchSubmissions} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              ⟳ Refresh
            </button>
            <button onClick={toggleApiMode} className={`px-4 py-2 rounded ${apiMode === 'live' ? 'bg-indigo-600' : 'bg-yellow-500'} text-white`}>
              {apiMode === 'live' ? 'Live Data' : 'Demo Data'}
            </button>
            <button onClick={exportToCSV} disabled={!filteredSubmissions.length} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              ↓ Export CSV
            </button>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border dark:border-gray-700 rounded mb-4 dark:bg-gray-800"
        />

        {error && (
          <div className="bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200 p-4 rounded mb-4">
            <p><strong>Warning:</strong> {error}</p>
          </div>
        )}

        {loading ? (
          <p className="text-center py-8">Loading...</p>
        ) : filteredSubmissions.length === 0 ? (
          <p className="text-center text-gray-500">No submissions found</p>
        ) : (
          <div className="grid gap-4">
            {filteredSubmissions.map((sub) => (
              <div key={sub.id} className="p-4 rounded bg-gray-100 dark:bg-gray-800 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{sub.name}</h2>
                    <p className="text-blue-600 break-all">{sub.email}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(sub.submitted_at), 'PPpp')}
                  </p>
                </div>
                <p className="mt-3 whitespace-pre-wrap">{sub.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
