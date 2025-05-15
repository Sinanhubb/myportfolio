import React, { useEffect, useState, useCallback } from 'react'; 
import axios from 'axios'; 
import { format } from 'date-fns'; 
 
const AdminPanel = () => { 
  const [submissions, setSubmissions] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [apiMode, setApiMode] = useState('live'); // 'live' or 'mock' 
 
  const API_BASE = 
    import.meta.env?.VITE_API_BASE_URL || 
    (window?.location?.hostname?.includes('netlify') 
      ? 'https://myportfolio-oflk.onrender.com' 
      : 'http://localhost:5000'); 
 
  const validateToken = (token) => 
    token && 
    typeof token === 'string' && 
    token.length > 30 && 
    !['undefined', 'null', 'dummy-token'].includes(token); 
 
  // Load mock data when API fails 
  const loadMockData = useCallback(() => { 
    const mockSubmissions = [ 
      { 
        id: '1', 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
        message: 'I really like your portfolio! Would love to discuss a potential project.', 
        submitted_at: new Date(Date.now() - 3600000).toISOString() 
      }, 
      { 
        id: '2', 
        name: 'Jane Smith', 
        email: 'jane.smith@example.com', 
        message: 'Hi there! Are you available for freelance work next month?', 
        submitted_at: new Date(Date.now() - 86400000).toISOString() 
      }, 
      { 
        id: '3', 
        name: 'Alex Johnson', 
        email: 'alex@company.com', 
        message: "I'd like to schedule a call to discuss a potential collaboration.", 
        submitted_at: new Date(Date.now() - 172800000).toISOString() 
      } 
    ]; 
 
    setSubmissions(mockSubmissions); 
    setLoading(false); 
  }, []); 
 
  // Handle API errors gracefully 
  const handleApiError = useCallback((err) => { 
    console.error('API Error:', err); 
 
    if (err.response?.status === 401 || err.response?.status === 403) { 
      localStorage.removeItem('admin_token'); 
      window.location.href = '/admin-login'; 
    } else if (err.code === 'ECONNABORTED' || err.message === 'Network Error') { 
      setError('Network issue occurred. Switched to demo mode.'); 
      setApiMode('mock'); 
      loadMockData(); 
    } else if (err.response?.data?.message) { 
      setError(`Server error: ${err.response.data.message}`); 
    } else { 
      setError(err.message || 'Failed to fetch submissions. Please try again.'); 
    } 
  }, [loadMockData]); 
 
  const fetchSubmissions = useCallback(async () => { 
    try { 
      setLoading(true); 
      setError(null); 
 
      const token = localStorage.getItem('admin_token'); 
 
      if (!validateToken(token)) { 
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
          ...sub, 
          id: sub.id || `${sub.email}-${sub.submitted_at || sub.created_at}`, 
          submitted_at: sub.submitted_at || sub.created_at || new Date().toISOString(), 
        })); 
        setSubmissions(formatted); 
      } else { 
        throw new Error('Invalid data format received from server'); 
      } 
    } catch (err) { 
      handleApiError(err); 
    } finally { 
      setLoading(false); 
    } 
  }, [API_BASE, apiMode, handleApiError, loadMockData]); 
 
  useEffect(() => { 
    const token = localStorage.getItem('admin_token'); 
    if (!validateToken(token)) { 
      window.location.href = '/admin-login'; 
      return; 
    } 
    fetchSubmissions(); 
  }, [fetchSubmissions]); 
 
  const handleLogout = () => { 
    localStorage.removeItem('admin_token'); 
    window.location.href = '/admin-login'; 
  }; 
 
  const exportToCSV = () => { 
    const headers = ['Name', 'Email', 'Message', 'Date']; 
    const csvContent = [ 
      headers.join(','), 
      ...filteredSubmissions.map((sub) => 
        `"${sub.name.replace(/"/g, '""')}","${sub.email}","${sub.message.replace(/"/g, 
'""')}","${format(new Date(sub.submitted_at), 'PPpp')}"` 
      ), 
    ].join('\n'); 
 
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }); 
    const url = URL.createObjectURL(blob); 
    const link = document.createElement('a'); 
    link.href = url; 
    link.setAttribute('download', `submissions-${format(new Date(), 'yyyy-MM-dd')}.csv`); 
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }; 
 
  const filteredSubmissions = submissions.filter((sub) => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.message.toLowerCase().includes(searchTerm.toLowerCase()) 
  ); 
 
  const toggleApiMode = useCallback(() => { 
    const newMode = apiMode === 'live' ? 'mock' : 'live'; 
    setApiMode(newMode); 
    setError(null); 
 
    if (newMode === 'mock') { 
      loadMockData(); 
    } else { 
      fetchSubmissions(); 
    } 
  }, [apiMode, loadMockData, fetchSubmissions]); 
 
  return ( 
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 text-gray-800 dark:text
white"> 
      <div className="max-w-4xl mx-auto"> 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb
6"> 
          <h1 className="text-3xl font-bold"> 
                 Admin Panel – {loading ? '...' : filteredSubmissions.length} Submission 
            {filteredSubmissions.length !== 1 && 's'} 
          </h1> 
          <div className="flex flex-wrap gap-2 w-full sm:w-auto"> 
            <button 
              onClick={fetchSubmissions} 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 
dark:hover:bg-gray-600 transition-colors" 
              disabled={loading} 
            > 
              {loading ? 'Refreshing...' : '⟳ Refresh'} 
            </button> 
            <button 
              onClick={toggleApiMode} 
              className={`px-4 py-2 rounded transition-colors ${ 
                apiMode === 'live' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-yellow-500 text-white hover:bg-yellow-600' 
              }`} 
            > 
              {apiMode === 'live' ? '    Live Data' : '         Demo Data'} 
            </button> 
            <button 
              onClick={exportToCSV} 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition
colors" 
              disabled={loading || filteredSubmissions.length === 0} 
            > 
              ↓ Export CSV 
            </button> 
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" 
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
 
        {error && ( 
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text
yellow-800 dark:text-yellow-200 rounded-lg mb-4"> 
            <p className="font-medium">Notice:</p> 
            <p>{error}</p> 
            {apiMode === 'mock' && ( 
              <p className="mt-2 text-sm"> 
                Showing sample data. You can switch back to live data using the "Live Data" button. 
              </p> 
            )} 
          </div> 
        )} 
 
        {loading && ( 
          <div className="flex justify-center items-center py-12"> 
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue
500"></div> 
          </div> 
        )} 
 
        {!loading && filteredSubmissions.length === 0 && ( 
          <p className="text-center text-gray-500 dark:text-gray-400 py-8"> 
            {searchTerm ? 'No matching submissions found' : 'No submissions yet'} 
          </p> 
        )} 
 
        {!loading && filteredSubmissions.length > 0 && ( 
          <div className="grid gap-4"> 
            {filteredSubmissions.map((submission) => ( 
              <div 
                key={submission.id} 
                className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow hover:shadow-md 
transition" 
              > 
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2"> 
                  <div> 
                    <h2 className="text-xl font-semibold">{submission.name}</h2> 
                    <p className="text-sm text-blue-600 dark:text-blue-400 break-all"> 
                      {submission.email} 
                    </p> 
                  </div> 
                  <p className="text-sm text-gray-500 dark:text-gray-400"> 
                    {format(new Date(submission.submitted_at), 'PPpp')} 
                  </p> 
                </div> 
                <p className="mt-3 whitespace-pre-wrap">{submission.message}</p> 
              </div> 
            ))} 
          </div> 
        )} 
      </div> 
    </div> 
  ); 
}; 
 
export default AdminPanel;