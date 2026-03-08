import React, { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { FaSearch, FaUserEdit, FaTrash, FaCheckCircle, FaTimes, FaUsers, FaChair, FaSync } from 'react-icons/fa';
import '../Styles/admin.css'; // Reusing styles and adding specific ones
import bgVideo from '../assets/bg.mp4';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const socket = io(API_URL);

const EventDayAdmin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminInfo, setAdminInfo] = useState({ name: '', subRole: '' });
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTable, setSelectedTable] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [editingDetails, setEditingDetails] = useState({});

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
            setAdminInfo({
                name: sessionStorage.getItem('adminName'),
                subRole: sessionStorage.getItem('adminSubRole')
            });
            setLoggedIn(true);
            fetchData(token);
        } else {
            window.location.href = '#/admin';
        }

        // Socket listeners
        socket.on('seat-updated', (data) => {
            setRegistrations(prev => prev.map(reg =>
                reg._id === data.registrationId
                    ? { ...reg, groupNo: data.groupNo, tableNo: data.tableNo }
                    : (reg.tableNo === data.tableNo ? { ...reg, tableNo: null, groupNo: null } : reg)
            ));
        });

        socket.on('team-detail-updated', (data) => {
            setRegistrations(prev => prev.map(reg =>
                reg._id === data.id ? { ...reg, ...data.details } : reg
            ));
        });

        return () => {
            socket.off('seat-updated');
            socket.off('team-detail-updated');
        };

    }, []);

    const fetchData = async (token) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/admin/data`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                // Only Srijan (Hackathon) teams are displayed in the Event Day panel
                setRegistrations(data.srijan.entries);
            }

        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleUpdateEntry = async (id, updates) => {
        try {
            const token = sessionStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/api/admin/update-registration/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (data.success) {
                // Update local state and broadcast via socket
                setRegistrations(prev => prev.map(reg => reg._id === id ? { ...reg, ...updates } : reg));
                socket.emit('seat-update', {
                    registrationId: id,
                    groupNo: updates.groupNo || null,
                    tableNo: updates.tableNo || null
                });
                return true;
            }
        } catch (err) {
            console.error(err);
        }
        return false;
    };

    const tableGrid = useMemo(() => {
        const grid = Array.from({ length: 100 }, (_, i) => i + 1);
        return grid.map(num => {
            const occupant = registrations.find(r => r.tableNo === num);
            return { number: num, occupant };
        });
    }, [registrations]);

    const filteredParticipants = useMemo(() => {
        if (!searchTerm) return [];
        return registrations.filter(r =>
            r.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.leaderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.leaderPhone?.includes(searchTerm)
        ).slice(0, 10);
    }, [searchTerm, registrations]);

    const handleTableClick = (table) => {
        setSelectedTable(table);
        if (table.occupant) {
            setEditingEntry(table.occupant);
            setEditingDetails({ ...table.occupant });
        } else {
            setEditingEntry(null);
            setSearchTerm('');
        }
        setShowEditModal(true);
    };

    const assignTeamToTable = async (entry) => {
        const ok = await handleUpdateEntry(entry._id, {
            tableNo: selectedTable.number,
            groupNo: selectedTable.number // Assuming 1:1 for now
        });
        if (ok) setShowEditModal(false);
    };

    const unassignTable = async () => {
        if (!editingEntry) return;
        const ok = await handleUpdateEntry(editingEntry._id, { tableNo: null, groupNo: null });
        if (ok) setShowEditModal(false);
    };

    const saveDetails = async (e) => {
        e.preventDefault();
        const ok = await handleUpdateEntry(editingEntry._id, editingDetails);
        if (ok) {
            socket.emit('team-detail-update', { id: editingEntry._id, details: editingDetails });
            setShowEditModal(false);
        }
    };


    if (!loggedIn) return null;

    return (
        <div className="admin-dashboard event-day-panel app-layout">
            <video className="global-bg-video" src={bgVideo} autoPlay loop muted playsInline />

            <header className="admin-header">
                <div className="admin-profile-info">
                    <div className="admin-welcome-line">
                        <span className="welcome-tag">EVENT DAY OPS</span>
                        <h2 className="admin-name-display">Live Command Console</h2>
                    </div>
                </div>
                <div className="admin-actions">
                    <button className="nav-mode-btn" onClick={() => window.location.href = '#/admin'}>RETURN TO SHIP</button>
                    <button className="refresh-btn" onClick={() => fetchData(sessionStorage.getItem('adminToken'))}>
                        <FaSync className={loading ? 'spin' : ''} />
                    </button>
                </div>
            </header>

            <div className="admin-content">
                <div className="event-day-layout">
                    {/* Left: Table Grid */}
                    <div className="grid-section">
                        <div className="section-header">
                            <h3><FaChair /> TABLE DEPLOYMENT GRID (1-100)</h3>
                            <div className="legend">
                                <span className="legend-item"><i className="dot free"></i> Free</span>
                                <span className="legend-item"><i className="dot busy"></i> Occupied</span>
                            </div>
                        </div>
                        <div className="tables-grid">
                            {tableGrid.map(t => (
                                <div
                                    key={t.number}
                                    className={`table-box ${t.occupant ? 'occupied' : 'available'}`}
                                    onClick={() => handleTableClick(t)}
                                >
                                    <span className="table-num">{t.number}</span>
                                    {t.occupant && <span className="team-hint">{t.occupant.teamName.substring(0, 8)}..</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Quick Stats */}
                    <div className="ops-sidebar">
                        <div className="detail-panel stat-panel">
                            <h3>MISSION STATUS</h3>
                            <div className="ops-stat">
                                <label>Total Teams</label>
                                <div className="val">{registrations.length}</div>
                            </div>
                            <div className="ops-stat">
                                <label>Tables Assigned</label>
                                <div className="val">{registrations.filter(r => r.tableNo).length} / 100</div>
                            </div>
                        </div>

                        <div className="detail-panel search-panel">
                            <h3>TEAM SEARCH</h3>
                            <div className="search-box-container">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search Team/Leader..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="search-results">
                                {filteredParticipants.map(r => (
                                    <div key={r._id} className="search-result-item" onClick={() => {
                                        setEditingEntry(r);
                                        setEditingDetails({ ...r });
                                        setShowEditModal(true);
                                        setSelectedTable({ number: r.tableNo || 'Not Assigned' });
                                    }}>
                                        <div className="res-info">
                                            <strong>{r.teamName}</strong>
                                            <span>{r.leaderName}</span>
                                        </div>
                                        <div className="res-tag">{r.tableNo ? `T-${r.tableNo}` : 'UNASSIGNED'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Assignment/Edit */}
            {showEditModal && (
                <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="admin-modal-content cosmic-drawer" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingEntry ? 'MODIFY ASSIGNMENT' : `ASSIGN TABLE ${selectedTable?.number}`}</h3>
                            <button className="close-modal" onClick={() => setShowEditModal(false)}><FaTimes /></button>
                        </div>

                        <div className="modal-body">
                            {!editingEntry ? (
                                <div className="assignment-flow">
                                    <p className="hint-text">Search and select a team to assign to Table {selectedTable?.number}</p>
                                    <div className="search-box-container">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Type team name..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="modal-search-results">
                                        {filteredParticipants.map(r => (
                                            <div key={r._id} className="modal-res-item" onClick={() => assignTeamToTable(r)}>
                                                <span>{r.teamName} ({r.leaderName})</span>
                                                <FaCheckCircle className="assign-icon" />
                                            </div>
                                        ))}
                                        {searchTerm && filteredParticipants.length === 0 && <p className="no-res">No teams found.</p>}
                                    </div>
                                </div>
                            ) : (
                                <form className="edit-details-form" onSubmit={saveDetails}>
                                    <div className="current-assignment">
                                        <h4>Current Station: TABLE {editingEntry.tableNo || 'N/A'}</h4>
                                        <button type="button" className="unassign-btn" onClick={unassignTable}>
                                            <FaTrash /> UNASSIGN TABLE
                                        </button>
                                    </div>

                                    <div className="inputs-grid">
                                        <div className="form-group full-width">
                                            <label>Problem Statement</label>
                                            <select
                                                value={editingDetails.problemStatement || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, problemStatement: e.target.value })}
                                                className="cosmic-select"
                                            >
                                                <option value="Problem Statement 1">Problem Statement 1</option>
                                                <option value="Problem Statement 2">Problem Statement 2</option>
                                                <option value="Student Innovation">Student Innovation</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Team Name</label>
                                            <input
                                                type="text"
                                                value={editingDetails.teamName || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, teamName: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Institute / College</label>
                                            <input
                                                type="text"
                                                value={editingDetails.college || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, college: e.target.value })}
                                            />
                                        </div>

                                        <div className="section-divider">LEADER DETAILS</div>
                                        <div className="form-group">
                                            <label>Leader Name</label>
                                            <input
                                                type="text"
                                                value={editingDetails.leaderName || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, leaderName: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Leader Phone</label>
                                            <input
                                                type="text"
                                                value={editingDetails.leaderPhone || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, leaderPhone: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Leader Email</label>
                                            <input
                                                type="text"
                                                value={editingDetails.leaderEmail || ''}
                                                onChange={e => setEditingDetails({ ...editingDetails, leaderEmail: e.target.value })}
                                            />
                                        </div>

                                        {editingDetails.members?.map((member, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className="section-divider">TEAM MEMBER {idx + 2}</div>
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input
                                                        type="text"
                                                        value={member.name || ''}
                                                        onChange={e => {
                                                            const newMembers = [...editingDetails.members];
                                                            newMembers[idx].name = e.target.value;
                                                            setEditingDetails({ ...editingDetails, members: newMembers });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input
                                                        type="text"
                                                        value={member.phone || ''}
                                                        onChange={e => {
                                                            const newMembers = [...editingDetails.members];
                                                            newMembers[idx].phone = e.target.value;
                                                            setEditingDetails({ ...editingDetails, members: newMembers });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group full-width">
                                                    <label>Email</label>
                                                    <input
                                                        type="text"
                                                        value={member.email || ''}
                                                        onChange={e => {
                                                            const newMembers = [...editingDetails.members];
                                                            newMembers[idx].email = e.target.value;
                                                            setEditingDetails({ ...editingDetails, members: newMembers });
                                                        }}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        ))}

                                        <div className="section-divider">PAYMENT INFO</div>
                                        <div className="form-group full-width read-only-group">
                                            <label>UTR Number (Verified)</label>
                                            <input
                                                type="text"
                                                value={editingDetails.utrNumber || ''}
                                                readOnly
                                                className="read-only-input"
                                            />
                                            <small className="field-hint">Fixed value from registration</small>
                                        </div>
                                    </div>

                                    <button type="submit" className="save-changes-btn">APPLY REVISIONS</button>
                                </form>

                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .event-day-layout {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 25px;
                }
                .tables-grid {
                    display: grid;
                    grid-template-columns: repeat(10, 1fr);
                    gap: 12px;
                    margin-top: 20px;
                    padding: 15px;
                    background: rgba(15, 23, 42, 0.4);
                    border-radius: 12px;
                    border: 1px solid rgba(139, 92, 246, 0.2);
                }
                .table-box {
                    aspect-ratio: 1;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .table-box:hover {
                    background: rgba(139, 92, 246, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
                    border-color: #8b5cf6;
                }
                .table-box.occupied {
                    background: rgba(239, 68, 68, 0.15);
                    border-color: rgba(239, 68, 68, 0.5);
                }
                .table-box.occupied:hover {
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
                    border-color: #ef4444;
                }
                .table-box.occupied .table-num { color: #f87171; }
                .table-num { font-size: 1.1rem; font-weight: 800; color: #a78bfa; transition: color 0.3s; }
                .team-hint { font-size: 0.55rem; opacity: 0.8; color: #cbd5e1; margin-top: 2px; }

                .legend { display: flex; gap: 20px; font-size: 0.85rem; font-weight: 500; }
                .legend-item { display: flex; align-items: center; gap: 8px; }
                .dot { width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 5px currentColor; }
                .dot.free { background: #10b981; color: #10b981; }
                .dot.busy { background: #ef4444; color: #ef4444; }

                .ops-sidebar { display: flex; flex-direction: column; gap: 20px; }
                .detail-panel { 
                    background: rgba(15, 23, 42, 0.8) !important;
                    border: 1px solid rgba(139, 92, 246, 0.2) !important;
                    backdrop-filter: blur(10px);
                }
                .ops-stat { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .ops-stat label { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
                .ops-stat .val { font-weight: 700; color: #60a5fa; font-family: 'Orbitron', monospace; }

                .edit-details-form {
                    padding: 5px;
                }
                .inputs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                    margin-top: 15px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-group label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #94a3b8;
                    font-weight: 600;
                    margin-left: 2px;
                }
                .form-group input {
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 8px;
                    padding: 10px 14px;
                    color: white;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .form-group input:focus {
                    background: rgba(15, 23, 42, 0.9);
                    border-color: #8b5cf6;
                    box-shadow: 0 0 10px rgba(139, 92, 246, 0.2);
                    outline: none;
                }

                .read-only-group {
                    background: rgba(255,255,255,0.02);
                    padding: 12px;
                    border-radius: 10px;
                    border: 1px dashed rgba(139, 92, 246, 0.2);
                }
                .read-only-input {
                    background: transparent !important;
                    border: none !important;
                    color: #60a5fa !important;
                    font-weight: bold !important;
                    font-family: monospace;
                    padding-left: 0 !important;
                    font-size: 1rem !important;
                }
                .field-hint {
                    color: #64748b;
                    font-size: 0.65rem;
                    font-style: italic;
                    margin-top: 2px;
                }

                .form-group.full-width { grid-column: span 2; }
                .section-divider {
                    grid-column: span 2;
                    padding: 10px 15px;
                    background: linear-gradient(90deg, rgba(139, 92, 246, 0.2) 0%, transparent 100%);
                    border-left: 4px solid #8b5cf6;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin: 25px 0 10px 0;
                    color: #c084fc;
                    text-transform: uppercase;
                }
                .cosmic-select {
                    width: 100%;
                    padding: 12px;
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px solid rgba(139, 92, 246, 0.4);
                    color: white;
                    border-radius: 8px;
                    font-family: 'Orbitron', sans-serif;
                    cursor: pointer;
                    font-size: 0.85rem;
                }
                .cosmic-select:focus { border-color: #8b5cf6; box-shadow: 0 0 10px rgba(139, 92, 246, 0.2); outline: none; }

                .search-result-item {
                    background: rgba(30, 41, 59, 0.4);
                    padding: 12px 15px;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .search-result-item:hover {
                    background: rgba(139, 92, 246, 0.1);
                    border-color: rgba(139, 92, 246, 0.3);
                    transform: translateX(5px);
                }

                .modal-res-item {
                    padding: 14px 18px;
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .modal-res-item:hover { 
                    background: rgba(16, 185, 129, 0.1); 
                    border-color: rgba(16, 185, 129, 0.3);
                    transform: scale(1.01);
                }

                .current-assignment {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 22px;
                    background: rgba(139, 92, 246, 0.1);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 12px;
                    margin-bottom: 25px;
                    box-shadow: inset 0 0 20px rgba(139, 92, 246, 0.05);
                }
                .current-assignment h4 { margin: 0; color: #a78bfa; font-family: 'Orbitron', sans-serif; font-size: 1rem; }
                .unassign-btn {
                    background: rgba(239, 68, 68, 0.2);
                    color: #f87171;
                    border: 1px solid rgba(239, 68, 68, 0.5);
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .unassign-btn:hover { background: #ef4444; color: white; transform: rotate(-1deg); }

                .save-changes-btn {
                    margin-top: 30px;
                    width: 100%;
                    padding: 16px;
                    font-size: 1rem;
                    font-weight: 800;
                    letter-spacing: 3px;
                    background: linear-gradient(90deg, #8b5cf6, #6366f1);
                    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
                    transition: all 0.3s;
                }
                .save-changes-btn:hover {
                    box-shadow: 0 0 25px rgba(139, 92, 246, 0.5);
                    transform: translateY(-2px);
                }

                @media (max-width: 1024px) {
                    .event-day-layout { grid-template-columns: 1fr; }
                    .tables-grid { grid-template-columns: repeat(5, 1fr); }
                }
            `}</style>
        </div>
    );
};

export default EventDayAdmin;
