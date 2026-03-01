import React, { useState, useEffect, useRef } from 'react';
import '../Styles/admin.css';
import bgVideo from '../assets/bg.mp4';
import { FaMusic, FaUsers, FaHotel, FaProjectDiagram, FaDesktop, FaChartPie, FaTable, FaSync, FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ id: '', password: '' });
    const [error, setError] = useState('');

    // Dashboard state
    const [summary, setSummary] = useState(null);
    const [activeEvent, setActiveEvent] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'messages'
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [adminInfo, setAdminInfo] = useState({ name: '', subRole: '' });
    const [accFilter, setAccFilter] = useState('ALL');
    const [srijanFilter, setSrijanFilter] = useState('ALL');
    const [culturalActivityFilter, setCulturalActivityFilter] = useState('ALL');
    const [culturalSubFilter, setCulturalSubFilter] = useState('ALL');

    const [broadcastData, setBroadcastData] = useState({
        subject: '',
        body: '',
        targetEvents: ['ALL']
    });
    const [selectedRecipientIds, setSelectedRecipientIds] = useState([]); // List of IDs to send to
    const [broadcasting, setBroadcasting] = useState(false);

    const detailPanelRef = useRef(null);

    useEffect(() => {
        if (activeEvent && detailPanelRef.current) {
            detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeEvent]);

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            setAdminInfo({
                name: sessionStorage.getItem('adminName'),
                subRole: sessionStorage.getItem('adminSubRole')
            });
            setLoggedIn(true);
            fetchData(token);
        }
    }, []);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setAuthLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();

            // Simulate hyperspace jump delay for the theme
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (res.ok && data.success) {
                sessionStorage.setItem('adminToken', data.token);
                sessionStorage.setItem('adminName', data.adminInfo.name);
                sessionStorage.setItem('adminSubRole', data.adminInfo.subRole);
                setAdminInfo(data.adminInfo);
                setLoggedIn(true);
                fetchData(data.token);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminName');
        sessionStorage.removeItem('adminSubRole');
        setLoggedIn(false);
        setSummary(null);
        setActiveEvent(null);
        setAdminInfo({ name: '', subRole: '' });
    };

    const downloadExcel = () => {
        if (!summary || !activeEvent) return;

        let displayEntries = summary[activeEvent].entries;

        if (activeEvent === 'accommodation' && accFilter !== 'ALL') {
            displayEntries = displayEntries.filter(e => e.event === accFilter);
        } else if (activeEvent === 'srijan' && srijanFilter !== 'ALL') {
            displayEntries = displayEntries.filter(e => e.problemStatement === srijanFilter);
        } else if (activeEvent === 'cultural' && culturalActivityFilter !== 'ALL') {
            displayEntries = displayEntries.filter(e => e.activity.toLowerCase().includes(culturalActivityFilter));
            if (culturalSubFilter !== 'ALL') {
                displayEntries = displayEntries.filter(e => e.activity.toLowerCase() === culturalSubFilter);
            }
        }

        // Map data for export
        let exportData = [];
        if (activeEvent === 'accommodation') {
            exportData = displayEntries.map((e, i) => ({
                '#': i + 1,
                'Event': e.event,
                'Team Name': e.teamName,
                'College': e.college,
                'Leader': e.leaderName,
                'Size': e.teamSize,
                'Girls': e.girls,
                'Boys': e.boys
            }));
        } else if (activeEvent === 'cultural') {
            exportData = displayEntries.map((e, i) => ({
                '#': i + 1,
                'Participant Name': e.participantName,
                'Class': e.className,
                'Activity': e.activity,
                'Member 2': e.member2Name ? `${e.member2Name} (${e.member2Class})` : '-',
                'Group Size': e.groupSize || '-',
                'Contact': e.contact,
                'Email': e.email
            }));
        } else {
            // Srijan, Ankur, Udbhav
            exportData = displayEntries.map((e, i) => ({
                '#': i + 1,
                'Group Name': e.teamName,
                'Leader Name': e.leaderName || 'N/A',
                'College': e.college || 'N/A',
                'Group Size': e.teamSize || 'N/A',
                'UTR Number': e.utrNumber || 'N/A',
                ...(activeEvent === 'ankur' ? { 'Category': e.category || 'N/A' } : {}),
                ...(activeEvent === 'srijan' ? { 'Problem Statement': e.problemStatement || 'N/A' } : {})
            }));
        }

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, activeEvent.toUpperCase());
        XLSX.writeFile(wb, `${activeEvent}_data_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const fetchData = async (token) => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/admin/data`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            if (res.ok) {
                setSummary(data);
            } else {
                handleLogout();
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleSendBulkEmail = async (e) => {
        e.preventDefault();

        if (selectedRecipientIds.length === 0) {
            alert('Please select at least one recipient.');
            return;
        }

        if (!window.confirm(`Are you sure you want to broadcast this message to ${selectedRecipientIds.length} selected recipients?`)) return;

        setBroadcasting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // Map selected IDs back to their details for the backend
            // Or just send the IDs and let backend handle it? 
            // Better to send specific recipient list to avoid any confusion
            const recipientsToSend = getAllAvailableRecipients()
                .filter(r => selectedRecipientIds.includes(r.id))
                .map(r => ({ id: r.id, email: r.email, name: r.name, team: r.team, type: r.type }));

            const res = await fetch(`${API_URL}/api/admin/send-bulk-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({
                    ...broadcastData,
                    recipients: recipientsToSend // Send explicit list
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                setBroadcastData({ ...broadcastData, subject: '', body: '' });
                setSelectedRecipientIds([]);
            } else {
                alert(data.error || 'Broadcast failed');
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
        setBroadcasting(false);
    };

    const getAllAvailableRecipients = () => {
        if (!summary) return [];
        let list = [];

        const targets = broadcastData.targetEvents;
        const isAll = targets.includes('ALL');

        if (isAll || targets.includes('Srijan (Hackathon)')) {
            summary.srijan.entries.forEach(e => list.push({ id: e._id, name: e.leaderName, email: e.leaderEmail || 'N/A', team: e.teamName, type: 'Registration' }));
        }
        if (isAll || targets.includes('Ankur (Project Expo)')) {
            summary.ankur.entries.forEach(e => list.push({ id: e._id, name: e.leaderName, email: e.leaderEmail || 'N/A', team: e.teamName, type: 'Registration' }));
        }
        if (isAll || targets.includes('Udbhav (Conference)')) {
            summary.udbhav.entries.forEach(e => list.push({ id: e._id, name: e.leaderName, email: e.leaderEmail || 'N/A', team: e.teamName, type: 'Registration' }));
        }
        if (isAll || targets.includes('Cultural')) {
            summary.cultural.entries.forEach(e => list.push({ id: e._id, name: e.participantName, email: e.email || 'N/A', team: 'Cultural Team', type: 'Cultural' }));
        }
        if (isAll || targets.includes('Accommodation')) {
            summary.accommodation.entries.forEach(e => list.push({ id: e._id, name: e.leaderName, email: e.leaderEmail || 'N/A', team: e.teamName, type: 'Accommodation' }));
        }

        return list;
    };

    const toggleRecipient = (id) => {
        setSelectedRecipientIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const selectAllFiltered = () => {
        const available = getAllAvailableRecipients();
        const availableIds = available.map(r => r.id);
        const allSelected = availableIds.every(id => selectedRecipientIds.includes(id));

        if (allSelected) {
            // Deselect only the ones currently visible
            setSelectedRecipientIds(prev => prev.filter(id => !availableIds.includes(id)));
        } else {
            // Select all currently visible
            setSelectedRecipientIds(prev => [...new Set([...prev, ...availableIds])]);
        }
    };

    const handleSendMail = async (teamId, eventType) => {
        if (!window.confirm('Send confirmation email to this participant/team?')) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const endpoint = eventType === 'cultural'
                ? `${API_URL}/api/admin/cultural/send-confirmation/${teamId}`
                : `${API_URL}/api/admin/send-confirmation/${teamId}`;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                }
            });
            const data = await res.json();
            if (res.ok && data.success) {
                alert('Email sent successfully!');
                fetchData(sessionStorage.getItem('adminToken')); // Refresh data
            } else {
                alert(data.error || 'Failed to send email');
            }
        } catch (err) {
            console.error(err);
            alert('Error sending email');
        }
    };

    if (!loggedIn) {
        return (
            <div className="admin-login-container app-layout">
                <video
                    className="global-bg-video"
                    src={bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <form className="admin-login-form" onSubmit={handleLogin}>
                    <h2>Command Center Access</h2>
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
                    <button type="submit" disabled={authLoading || loading}>
                        {authLoading || loading ? 'ESTABLISHING UPLINK...' : 'INITIATE HYPER-DRIVE'}
                    </button>
                    <button type="button" className="ghost-btn" onClick={() => window.location.href = '#/'}>Return Home</button>
                </form>
            </div>
        );
    }

    const getCulturalTotals = () => {
        if (!summary || !summary.cultural) return {};
        const totals = {};
        summary.cultural.entries.forEach(entry => {
            const activity = entry.activity.toLowerCase();
            totals[activity] = (totals[activity] || 0) + 1;
        });
        return totals;
    };

    const culturalTotals = getCulturalTotals();

    return (
        <div className="admin-dashboard app-layout">
            <video
                className="global-bg-video"
                src={bgVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <header className="admin-header">
                <div className="admin-profile-info">
                    <div className="admin-welcome-line">
                        <span className="welcome-tag">SYSTEM ACCESS GRANTED</span>
                        <h2 className="admin-name-display">{adminInfo.name}</h2>
                    </div>
                    <div className="admin-meta-info">
                        <span className="sub-role-badge">{adminInfo.subRole}</span>
                        <p className="admin-desc-text">NAVONMESH COMMAND CENTRAL v2.6</p>
                    </div>
                </div>
                <div className="admin-actions">
                    <button
                        className={`nav-mode-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        DASHBOARD
                    </button>
                    <button
                        className={`nav-mode-btn ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        COMMUNICATION HUB
                    </button>
                    <button className="refresh-btn" onClick={() => fetchData(sessionStorage.getItem('adminToken'))} title="Refresh Data">
                        <FaSync className={loading ? 'spin' : ''} />
                    </button>
                    <button className="maintenance-btn" onClick={() => window.open('/#/admin/maintenance', '_blank')}>Maintenance</button>
                    <button className="logout-btn" onClick={handleLogout}>Abort Mission</button>
                </div>
            </header>


            {loading ? (
                <div className="admin-loader">Synchronizing data...</div>
            ) : summary ? (
                activeTab === 'dashboard' ? (
                    <div className="admin-content">
                        <div className="stats-grid">
                            <div className={`stat-card ${activeEvent === 'srijan' ? 'active' : ''}`}
                                onClick={() => setActiveEvent('srijan')}
                                onMouseMove={handleMouseMove}>
                                <div className="stat-card-scan"></div>
                                <div className="stat-icon-bg"><FaDesktop /></div>
                                <div className="stat-info">
                                    <h3>Srijan</h3>
                                    <p className="stat-sub">Hackathon</p>
                                </div>
                                <div className="stat-main">
                                    <div className="stat-number">{summary.srijan.count}</div>
                                    <div className="click-details">ACCESS STREAM</div>
                                </div>
                            </div>
                            <div className={`stat-card ${activeEvent === 'ankur' ? 'active' : ''}`}
                                onClick={() => setActiveEvent('ankur')}
                                onMouseMove={handleMouseMove}>
                                <div className="stat-card-scan"></div>
                                <div className="stat-icon-bg"><FaProjectDiagram /></div>
                                <div className="stat-info">
                                    <h3>Ankur</h3>
                                    <p className="stat-sub">Project Expo</p>
                                </div>
                                <div className="stat-main">
                                    <div className="stat-number">{summary.ankur.count}</div>
                                    <div className="click-details">ACCESS STREAM</div>
                                </div>
                            </div>
                            <div className={`stat-card ${activeEvent === 'udbhav' ? 'active' : ''}`}
                                onClick={() => setActiveEvent('udbhav')}
                                onMouseMove={handleMouseMove}>
                                <div className="stat-card-scan"></div>
                                <div className="stat-icon-bg"><FaUsers /></div>
                                <div className="stat-info">
                                    <h3>Udbhav</h3>
                                    <p className="stat-sub">Conference</p>
                                </div>
                                <div className="stat-main">
                                    <div className="stat-number">{summary.udbhav.count}</div>
                                    <div className="click-details">ACCESS STREAM</div>
                                </div>
                            </div>
                            <div className={`stat-card ${activeEvent === 'cultural' ? 'active' : ''}`}
                                onClick={() => setActiveEvent('cultural')}
                                onMouseMove={handleMouseMove}>
                                <div className="stat-card-scan"></div>
                                <div className="stat-icon-bg"><FaMusic /></div>
                                <div className="stat-info">
                                    <h3>Cultural</h3>
                                    <p className="stat-sub">Kala Spandan</p>
                                </div>
                                <div className="stat-main">
                                    <div className="stat-number">{summary.cultural.count}</div>
                                    <div className="click-details">ACCESS STREAM</div>
                                </div>
                            </div>
                            <div className={`stat-card ${activeEvent === 'accommodation' ? 'active' : ''}`}
                                onClick={() => setActiveEvent('accommodation')}
                                onMouseMove={handleMouseMove}>
                                <div className="stat-card-scan"></div>
                                <div className="stat-icon-bg"><FaHotel /></div>
                                <div className="stat-info">
                                    <h3>Stay</h3>
                                    <p className="stat-sub">Requisitions</p>
                                </div>
                                <div className="stat-main">
                                    <div className="stat-number">{summary.accommodation.count}</div>
                                    <div className="click-details">ACCESS STREAM</div>
                                </div>
                            </div>
                        </div>

                        {activeEvent && (
                            <div className="detail-panel" ref={detailPanelRef}>
                                <div className="panel-header-row">
                                    <div className="panel-title-group">
                                        <h3><FaTable style={{ marginRight: '10px' }} /> {activeEvent.toUpperCase()} DATA STREAM</h3>
                                        <div className="acc-sub-filters">
                                            <button className={
                                                (activeEvent === 'accommodation' && accFilter === 'ALL') ||
                                                    (activeEvent === 'srijan' && srijanFilter === 'ALL') ||
                                                    (activeEvent === 'cultural' && culturalActivityFilter === 'ALL') ? 'active' : ''
                                            } onClick={() => {
                                                setAccFilter('ALL');
                                                setSrijanFilter('ALL');
                                                setCulturalActivityFilter('ALL');
                                                setCulturalSubFilter('ALL');
                                            }}>Total</button>

                                            {activeEvent === 'accommodation' && (
                                                <>
                                                    <button className={accFilter === 'SRIJAN' ? 'active' : ''} onClick={() => setAccFilter('SRIJAN')}>Srijan</button>
                                                    <button className={accFilter === 'ANKUR' ? 'active' : ''} onClick={() => setAccFilter('ANKUR')}>Ankur</button>
                                                    <button className={accFilter === 'UDBHAV' ? 'active' : ''} onClick={() => setAccFilter('UDBHAV')}>Udbhav</button>
                                                </>
                                            )}
                                            {activeEvent === 'srijan' && (
                                                <>
                                                    <button className={srijanFilter === 'Student Innovation' ? 'active' : ''} onClick={() => setSrijanFilter('Student Innovation')}>Innovation</button>
                                                    <button className={srijanFilter === 'Problem Statement 1' ? 'active' : ''} onClick={() => setSrijanFilter('Problem Statement 1')}>PS 1</button>
                                                    <button className={srijanFilter === 'Problem Statement 2' ? 'active' : ''} onClick={() => setSrijanFilter('Problem Statement 2')}>PS 2</button>
                                                </>
                                            )}
                                            {activeEvent === 'cultural' && (
                                                <>
                                                    <button className={culturalActivityFilter === 'singing' ? 'active' : ''} onClick={() => { setCulturalActivityFilter('singing'); setCulturalSubFilter('ALL'); }}>Singing</button>
                                                    <button className={culturalActivityFilter === 'dance' ? 'active' : ''} onClick={() => { setCulturalActivityFilter('dance'); setCulturalSubFilter('ALL'); }}>Dance</button>
                                                    <button className={culturalActivityFilter === 'anchoring' ? 'active' : ''} onClick={() => { setCulturalActivityFilter('anchoring'); setCulturalSubFilter('ALL'); }}>Anchoring</button>
                                                    <button className={culturalActivityFilter === 'other' ? 'active' : ''} onClick={() => { setCulturalActivityFilter('other'); setCulturalSubFilter('ALL'); }}>Other</button>
                                                </>
                                            )}
                                            <button className="download-excel-btn" onClick={downloadExcel} title="Download Current Data as Excel">
                                                <FaDownload /> EXCEL
                                            </button>
                                        </div>
                                    </div>

                                    {activeEvent === 'cultural' && culturalActivityFilter === 'singing' && (
                                        <div className="acc-sub-filters animate-fade-in" style={{ marginTop: '10px' }}>
                                            <button className={culturalSubFilter === 'ALL' ? 'active' : ''} onClick={() => setCulturalSubFilter('ALL')}>All Singing</button>
                                            <button className={culturalSubFilter === 'solo singing' ? 'active' : ''} onClick={() => setCulturalSubFilter('solo singing')}>Solo</button>
                                            <button className={culturalSubFilter === 'duo singing' ? 'active' : ''} onClick={() => setCulturalSubFilter('duo singing')}>Duo</button>
                                        </div>
                                    )}

                                    {activeEvent === 'cultural' && culturalActivityFilter === 'dance' && (
                                        <div className="acc-sub-filters animate-fade-in" style={{ marginTop: '10px' }}>
                                            <button className={culturalSubFilter === 'ALL' ? 'active' : ''} onClick={() => setCulturalSubFilter('ALL')}>All Dance</button>
                                            <button className={culturalSubFilter === 'solo dance' ? 'active' : ''} onClick={() => setCulturalSubFilter('solo dance')}>Solo</button>
                                            <button className={culturalSubFilter === 'duo dance' ? 'active' : ''} onClick={() => setCulturalSubFilter('duo dance')}>Duo</button>
                                            <button className={culturalSubFilter === 'group dance' ? 'active' : ''} onClick={() => setCulturalSubFilter('group dance')}>Group</button>
                                        </div>
                                    )}

                                    {activeEvent === 'accommodation' && (() => {
                                        const filteredEntries = accFilter === 'ALL'
                                            ? summary.accommodation.entries
                                            : summary.accommodation.entries.filter(e => e.event === accFilter);

                                        const girls = filteredEntries.reduce((sum, e) => sum + e.girls, 0);
                                        const boys = filteredEntries.reduce((sum, e) => sum + e.boys, 0);
                                        const total = girls + boys || 1;

                                        return (
                                            <div className="pie-section">
                                                <div className="cosmic-pie" style={{
                                                    background: `conic-gradient(#ec4899 0% ${(girls / total) * 100}%, #3b82f6 ${(girls / total) * 100}% 100%)`
                                                }}></div>
                                                <div className="pie-legend">
                                                    <div className="legend-item"><span className="dot girls"></span> Girls: {girls}</div>
                                                    <div className="legend-item"><span className="dot boys"></span> Boys: {boys}</div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {activeEvent === 'srijan' && (() => {
                                        const innovations = summary.srijan.entries.filter(e => e.problemStatement === 'Student Innovation').length;
                                        const ps1 = summary.srijan.entries.filter(e => e.problemStatement === 'Problem Statement 1').length;
                                        const ps2 = summary.srijan.entries.filter(e => e.problemStatement === 'Problem Statement 2').length;

                                        return (
                                            <div className="pie-section stats-summary">
                                                <div className="summary-pill">Innovation: <span>{innovations}</span></div>
                                                <div className="summary-pill">PS 1: <span>{ps1}</span></div>
                                                <div className="summary-pill">PS 2: <span>{ps2}</span></div>
                                            </div>
                                        );
                                    })()}

                                    {activeEvent === 'cultural' && (
                                        <div className="cultural-summary-grid">
                                            {Object.entries(culturalTotals).map(([activity, count]) => (
                                                <div key={activity} className="summary-pill">
                                                    {activity.charAt(0).toUpperCase() + activity.slice(1)}: <span>{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="data-table-container">
                                    <table className="data-table">
                                        <thead>
                                            {activeEvent === 'accommodation' ? (
                                                <tr>
                                                    <th>#</th>
                                                    <th>Event</th>
                                                    <th>Team Name</th>
                                                    <th>College</th>
                                                    <th>Leader</th>
                                                    <th>Size</th>
                                                    <th>Girls</th>
                                                    <th>Boys</th>
                                                </tr>
                                            ) : activeEvent === 'cultural' ? (
                                                <tr>
                                                    <th>#</th>
                                                    <th>Participant Name</th>
                                                    <th>Class</th>
                                                    <th>Activity</th>
                                                    <th>Member 2</th>
                                                    <th>Group Size</th>
                                                    <th>Contact</th>
                                                    <th>Email</th>
                                                    <th>Action</th>
                                                </tr>
                                            ) : (
                                                <tr>
                                                    <th>#</th>
                                                    <th>Group Name</th>
                                                    <th>Leader Name</th>
                                                    <th>College</th>
                                                    <th>Group Size</th>
                                                    <th>UTR Number</th>
                                                    {activeEvent === 'ankur' && <th>Category</th>}
                                                    {activeEvent === 'srijan' && <th>Problem Statement</th>}
                                                    <th>Action</th>
                                                </tr>
                                            )}
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                let displayEntries = summary[activeEvent].entries;

                                                if (activeEvent === 'accommodation' && accFilter !== 'ALL') {
                                                    displayEntries = displayEntries.filter(e => e.event === accFilter);
                                                } else if (activeEvent === 'srijan' && srijanFilter !== 'ALL') {
                                                    displayEntries = displayEntries.filter(e => e.problemStatement === srijanFilter);
                                                } else if (activeEvent === 'cultural' && culturalActivityFilter !== 'ALL') {
                                                    displayEntries = displayEntries.filter(e => e.activity.toLowerCase().includes(culturalActivityFilter));
                                                    if (culturalSubFilter !== 'ALL') {
                                                        displayEntries = displayEntries.filter(e => e.activity.toLowerCase() === culturalSubFilter);
                                                    }
                                                }

                                                return displayEntries.length > 0 ? (
                                                    displayEntries.map((entry, idx) => (
                                                        <tr key={entry._id}>
                                                            <td>{idx + 1}</td>
                                                            {activeEvent === 'accommodation' ? (
                                                                <>
                                                                    <td className="event-badge-cell">
                                                                        <span className={`event-mini-badge ${entry.event.toLowerCase()}`}>
                                                                            {entry.event}
                                                                        </span>
                                                                    </td>
                                                                    <td>{entry.teamName}</td>
                                                                    <td>{entry.college}</td>
                                                                    <td>{entry.leaderName}</td>
                                                                    <td className="mono">{entry.teamSize}</td>
                                                                    <td className="girls-cell">{entry.girls}</td>
                                                                    <td className="boys-cell">{entry.boys}</td>
                                                                </>
                                                            ) : activeEvent === 'cultural' ? (
                                                                <>
                                                                    <td>{entry.participantName}</td>
                                                                    <td><span className="class-badge" style={{
                                                                        background: 'rgba(192, 132, 252, 0.2)',
                                                                        color: '#c084fc',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '6px',
                                                                        fontSize: '0.8rem',
                                                                        fontWeight: 'bold'
                                                                    }}>{entry.className}</span></td>
                                                                    <td><span className={`activity-badge ${entry.activity.split(' ')[0]}`} style={{
                                                                        background: 'rgba(129, 140, 248, 0.2)',
                                                                        color: '#818cf8',
                                                                        padding: '4px 8px',
                                                                        borderRadius: '6px',
                                                                        fontSize: '0.8rem',
                                                                        fontWeight: 'bold'
                                                                    }}>{entry.activity}</span></td>
                                                                    <td>{entry.member2Name ? `${entry.member2Name} (${entry.member2Class})` : '-'}</td>
                                                                    <td className="mono">{entry.groupSize || '-'}</td>
                                                                    <td>{entry.contact}</td>
                                                                    <td style={{ fontSize: '0.8rem', opacity: 0.8 }}>{entry.email}</td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() => handleSendMail(entry._id, 'cultural')}
                                                                            disabled={entry.paymentVerified}
                                                                            style={{
                                                                                padding: '6px 12px',
                                                                                backgroundColor: entry.paymentVerified ? '#4b5563' : '#3b82f6',
                                                                                color: 'white',
                                                                                border: 'none',
                                                                                borderRadius: '4px',
                                                                                cursor: entry.paymentVerified ? 'not-allowed' : 'pointer',
                                                                                fontWeight: 'bold',
                                                                                fontSize: '0.8rem',
                                                                                transition: 'background-color 0.2s'
                                                                            }}
                                                                            onMouseOver={(e) => !entry.paymentVerified && (e.target.style.backgroundColor = '#2563eb')}
                                                                            onMouseOut={(e) => !entry.paymentVerified && (e.target.style.backgroundColor = '#3b82f6')}
                                                                        >
                                                                            {entry.paymentVerified ? 'Mail Sent' : 'Send Mail'}
                                                                        </button>
                                                                    </td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <td>{entry.teamName}</td>
                                                                    <td>{entry.leaderName || 'N/A'}</td>
                                                                    <td>{entry.college || 'N/A'}</td>
                                                                    <td>{entry.teamSize || 'N/A'}</td>
                                                                    <td>
                                                                        <span className="utr-highlight" style={{
                                                                            color: '#22c55e',
                                                                            fontFamily: 'monospace',
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                            {entry.utrNumber || 'N/A'}
                                                                        </span>
                                                                    </td>
                                                                    {activeEvent === 'ankur' && <td>{entry.category || 'N/A'}</td>}
                                                                    {activeEvent === 'srijan' && <td>{entry.problemStatement || 'N/A'}</td>}
                                                                    <td>
                                                                        <button
                                                                            onClick={() => handleSendMail(entry._id, activeEvent)}
                                                                            disabled={entry.paymentVerified}
                                                                            style={{
                                                                                padding: '6px 12px',
                                                                                backgroundColor: entry.paymentVerified ? '#4b5563' : '#3b82f6',
                                                                                color: 'white',
                                                                                border: 'none',
                                                                                borderRadius: '4px',
                                                                                cursor: entry.paymentVerified ? 'not-allowed' : 'pointer',
                                                                                fontWeight: 'bold',
                                                                                fontSize: '0.8rem',
                                                                                transition: 'background-color 0.2s'
                                                                            }}
                                                                            onMouseOver={(e) => !entry.paymentVerified && (e.target.style.backgroundColor = '#2563eb')}
                                                                            onMouseOut={(e) => !entry.paymentVerified && (e.target.style.backgroundColor = '#3b82f6')}
                                                                        >
                                                                            {entry.paymentVerified ? 'Mail Sent' : 'Send Mail'}
                                                                        </button>
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={10} className="empty-row">No records found for this telemetry array.</td>
                                                    </tr>
                                                );
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Message System View */
                    <div className="admin-content broadcast-hub">
                        <div className="broadcast-layout">
                            {/* Left Side: Composer */}
                            <div className="broadcast-composer">
                                <div className="detail-panel">
                                    <h3>BROADCAST COMPOSER</h3>
                                    <p className="broadcast-subtitle">Personalized emails will be sent to the selected recipients on the right.</p>

                                    <form className="broadcast-form" onSubmit={handleSendBulkEmail}>
                                        <div className="form-group" style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', color: '#c084fc', fontFamily: 'Orbitron' }}>Email Subject</label>
                                            <input
                                                type="text"
                                                placeholder="Enter the broadcast subject..."
                                                value={broadcastData.subject}
                                                onChange={(e) => setBroadcastData({ ...broadcastData, subject: e.target.value })}
                                                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#fff', borderRadius: '8px' }}
                                                required
                                            />
                                        </div>

                                        <div className="form-group" style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', color: '#c084fc', fontFamily: 'Orbitron' }}>Message Content</label>
                                            <div className="template-tips" style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>
                                                Use <code>{'{{teamName}}'}</code> or <code>{'{{leaderName}}'}</code> for personalization.
                                            </div>
                                            <textarea
                                                rows="8"
                                                placeholder={`Greeting, {{leaderName}} of {{teamName}}! 

Welcome to the command hub. Your mission details are as follows...`}
                                                value={broadcastData.body}
                                                onChange={(e) => setBroadcastData({ ...broadcastData, body: e.target.value })}
                                                style={{ width: '100%', padding: '15px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#fff', borderRadius: '8px', fontFamily: 'Inter', lineHeight: '1.6' }}
                                                required
                                            />
                                        </div>

                                        <div className="broadcast-actions">
                                            <div className="selection-counter" style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px' }}>
                                                Selected Recipients: <span style={{ color: '#c084fc', fontWeight: 'bold' }}>{selectedRecipientIds.length}</span>
                                            </div>
                                            <button type="submit" className="send-all-btn" disabled={broadcasting || selectedRecipientIds.length === 0} style={{
                                                background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                                                color: '#fff',
                                                padding: '12px 30px',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontFamily: 'Orbitron',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                width: '100%',
                                                opacity: (broadcasting || selectedRecipientIds.length === 0) ? 0.6 : 1
                                            }}>
                                                {broadcasting ? 'TRANSMITTING...' : `INITIATE BROADCAST TO ${selectedRecipientIds.length} TEAMS`}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Right Side: Recipient Selection */}
                            <div className="broadcast-recipients">
                                <div className="detail-panel">
                                    <div className="recipient-header">
                                        <h3>RECIPIENT FLEET</h3>
                                        <button className="select-all-btn" onClick={selectAllFiltered}>
                                            {(() => {
                                                const available = getAllAvailableRecipients();
                                                const availableIds = available.map(r => r.id);
                                                return availableIds.every(id => selectedRecipientIds.includes(id)) ? 'DESELECT ALL' : 'SELECT ALL';
                                            })()}
                                        </button>
                                    </div>

                                    <div className="broadcast-targets" style={{ marginTop: '15px' }}>
                                        <div className="target-options">
                                            {['ALL', 'Srijan (Hackathon)', 'Ankur (Project Expo)', 'Udbhav (Conference)', 'Cultural', 'Accommodation'].map(ev => (
                                                <button
                                                    key={ev}
                                                    type="button"
                                                    className={`target-chip ${broadcastData.targetEvents.includes(ev) ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        if (ev === 'ALL') {
                                                            setBroadcastData({ ...broadcastData, targetEvents: ['ALL'] });
                                                        } else {
                                                            const newTargets = broadcastData.targetEvents.includes(ev)
                                                                ? broadcastData.targetEvents.filter(t => t !== ev)
                                                                : [...broadcastData.targetEvents.filter(t => t !== 'ALL'), ev];
                                                            setBroadcastData({ ...broadcastData, targetEvents: newTargets.length ? newTargets : ['ALL'] });
                                                        }
                                                    }}
                                                >
                                                    {ev === 'ALL' ? 'Total' : ev.split(' ')[0]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="recipient-list">
                                        {getAllAvailableRecipients().map(recipient => (
                                            <div
                                                key={recipient.id}
                                                className={`recipient-item ${selectedRecipientIds.includes(recipient.id) ? 'selected' : ''}`}
                                                onClick={() => toggleRecipient(recipient.id)}
                                            >
                                                <div className="recipient-checkbox">
                                                    {selectedRecipientIds.includes(recipient.id) && <div className="check-mark"></div>}
                                                </div>
                                                <div className="recipient-info">
                                                    <div className="recipient-name">{recipient.team}</div>
                                                    <div className="recipient-leader">{recipient.name}</div>
                                                </div>
                                                <div className="recipient-type-badge">{recipient.type.charAt(0)}</div>
                                            </div>
                                        ))}
                                        {getAllAvailableRecipients().length === 0 && (
                                            <div className="empty-recipients">No recipients found for selected streams.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : null}
        </div>
    );
};

export default Admin;
