import React, { useState, useEffect } from 'react';
import '../Styles/admin.css';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ id: '', password: '' });
    const [error, setError] = useState('');

    // Dashboard state
    const [summary, setSummary] = useState(null);
    const [activeEvent, setActiveEvent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            setLoggedIn(true);
            fetchData(token);
        }
    }, []);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();

            if (res.ok && data.success) {
                sessionStorage.setItem('adminToken', data.token);
                setLoggedIn(true);
                fetchData(data.token);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        setLoggedIn(false);
        setSummary(null);
        setActiveEvent(null);
    };

    const fetchData = async (token) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/admin/data', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            if (res.ok) {
                setSummary(data);
            } else {
                // If token invalid, logout
                handleLogout();
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    if (!loggedIn) {
        return (
            <div className="admin-login-container">
                <form className="admin-login-form" onSubmit={handleLogin}>
                    <h2>Admin Direct Access</h2>
                    {error && <p className="admin-error">{error}</p>}
                    <input
                        type="text"
                        name="id"
                        placeholder="Admin ID"
                        value={loginData.id}
                        onChange={handleLoginChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                    <button type="submit">Unlock System</button>
                    <button type="button" className="ghost-btn" onClick={() => window.location.href = '#/'}>Return Home</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h2>Navonmesh Data Matrix</h2>
                <button className="logout-btn" onClick={handleLogout}>Terminate Session</button>
            </header>

            {loading ? (
                <div className="admin-loader">Synchronizing data...</div>
            ) : summary ? (
                <div className="admin-content">
                    <div className="stats-grid">
                        <div className={`stat-card ${activeEvent === 'srijan' ? 'active' : ''}`} onClick={() => setActiveEvent('srijan')}>
                            <h3>Srijan</h3>
                            <div className="stat-number">{summary.srijan.count}</div>
                            <p>Entries</p>
                        </div>
                        <div className={`stat-card ${activeEvent === 'ankur' ? 'active' : ''}`} onClick={() => setActiveEvent('ankur')}>
                            <h3>Ankur</h3>
                            <div className="stat-number">{summary.ankur.count}</div>
                            <p>Entries</p>
                        </div>
                        <div className={`stat-card ${activeEvent === 'udbhav' ? 'active' : ''}`} onClick={() => setActiveEvent('udbhav')}>
                            <h3>Udbhav</h3>
                            <div className="stat-number">{summary.udbhav.count}</div>
                            <p>Entries</p>
                        </div>
                    </div>

                    {activeEvent && (
                        <div className="detail-panel">
                            <h3>{activeEvent.toUpperCase()} DATA STREAM</h3>
                            <div className="data-table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Group Name</th>
                                            <th>Leader Name</th>
                                            <th>Group Size</th>
                                            <th>UTR Number</th>
                                            {activeEvent === 'ankur' && <th>Category</th>}
                                            {activeEvent === 'srijan' && <th>Problem Statement</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summary[activeEvent].entries.length > 0 ? (
                                            summary[activeEvent].entries.map((entry, idx) => (
                                                <tr key={entry._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{entry.teamName}</td>
                                                    <td>{entry.leaderName || 'N/A'}</td>
                                                    <td>{entry.teamSize || 'N/A'}</td>
                                                    <td className="mono">{entry.utrNumber || 'N/A'}</td>
                                                    {activeEvent === 'ankur' && <td>{entry.category || 'N/A'}</td>}
                                                    {activeEvent === 'srijan' && <td>{entry.problemStatement || 'N/A'}</td>}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={activeEvent === 'ankur' || activeEvent === 'srijan' ? 6 : 5} className="empty-row">No records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Admin;
