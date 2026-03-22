import React, { useState, useEffect } from 'react';
import '../Styles/admin_maintenance.css';

const AdminMaintenance = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resolving, setResolving] = useState(null);

    // Creates an array of 100 boxes [1..100]
    const boxes = Array.from({ length: 100 }, (_, i) => i + 1);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const fetchIssues = async () => {
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/issues`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setIssues(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch issues:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchIssues();

        // Balanced polling (3s) for smooth performance and timely updates
        const intervalId = setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchIssues();
            }
        }, 3000);

        // Instant fetch on window focus
        const handleFocus = () => fetchIssues();
        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const markResolved = async (issueId) => {
        setResolving(issueId);
        try {
            const token = sessionStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/issues/resolve/${issueId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                // Instantly remove it from local state to feel snappy
                setIssues(issues.filter(i => i._id !== issueId));
            } else {
                alert('Failed to resolve issue. Try again.')
            }
        } catch (error) {
            console.error('Failed to resolve issue:', error);
            alert('Error connecting to the system.');
        } finally {
            setResolving(null);
        }
    };

    return (
        <div className="maintenance-dashboard">
            <header className="maintenance-header">
                <div>
                    <h1>MAINTENANCE COMMAND</h1>
                    <p className="subtitle">Live Issue Tracking Telemetry [Alpha Node]</p>
                </div>
                <div className="status-indicator">
                    <button
                        onClick={fetchIssues}
                        className="manual-sync-btn"
                        style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', marginRight: '15px' }}
                        title="Force Sync"
                    >
                        🔄
                    </button>
                    <span className="pulse-dot"></span> CONNECTION LIVE
                    <button 
                        onClick={() => {
                            sessionStorage.clear();
                            window.location.hash = '/admin';
                        }} 
                        className="logout-btn"
                        style={{ marginLeft: '15px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        LOGOUT
                    </button>
                </div>
            </header>

            {loading && issues.length === 0 ? (
                <div className="maintenance-loader">Initializing Radar...</div>
            ) : (
                <>
                    {/* Top Level Alert Banner */}
                    {issues.length > 0 && (
                        <div className="active-alerts-banner">
                            <div className="banner-icon">⚠️</div>
                            <div className="banner-content">
                                <h3>CRITICAL ISSUES DETECTED</h3>
                                <div className="banner-group-list">
                                    {issues.map(issue => (
                                        <button
                                            key={`banner-${issue._id}`}
                                            className="banner-group-pill"
                                            onClick={() => {
                                                const el = document.getElementById(`gp-box-${issue.groupNumber}`);
                                                if (el) {
                                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }
                                            }}
                                        >
                                            GP {issue.groupNumber}: <span style={{ fontWeight: 'normal', fontFamily: 'Inter, sans-serif' }}>{issue.issueDescription}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="telemetry-grid">
                        {boxes.map(num => {
                            // Check if this box has an active issue
                            const activeIssue = issues.find(i => Number(i.groupNumber) === num);

                            return (
                                <div
                                    key={num}
                                    id={`gp-box-${num}`}
                                    className={`telemetry-box ${activeIssue ? 'alert-active blink' : ''}`}
                                >
                                    <span className="box-number">GP {num}</span>

                                    {activeIssue && (
                                        <div className="box-actions">
                                            <div className="alert-text">DISTRESS</div>
                                            <div className="issue-desc-tooltip">
                                                {activeIssue.issueDescription}
                                            </div>
                                            <button
                                                className="resolve-btn"
                                                onClick={() => markResolved(activeIssue._id)}
                                                disabled={resolving === activeIssue._id}
                                            >
                                                {resolving === activeIssue._id ? 'Resolving...' : 'ACKNOWLEDGE'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminMaintenance;
