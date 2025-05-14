import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL || ''}/api/admin/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        
        // If unauthorized (401), log out
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/admin-login');
        }
        
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="admin-content">
        {/* Your admin panel content here */}
        <p>Welcome to the Admin Panel</p>
        
        {/* Example data display */}
        <div className="data-section">
          <h3>Data</h3>
          {data.length > 0 ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;