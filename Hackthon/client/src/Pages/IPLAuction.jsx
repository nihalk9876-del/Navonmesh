
import React, { useState, useEffect } from 'react';
import '../Styles/iplAuction.css';

// Initial Data
const INITIAL_TEAMS = [
    { id: 'team1', name: 'Chennai Gaints', password: 'team123', balance: 500000000, players: [] },
    { id: 'team2', name: 'Mumbai Indians', password: 'team234', balance: 500000000, players: [] },
    { id: 'team3', name: 'Royal Challengers', password: 'team345', balance: 500000000, players: [] },
    { id: 'team4', name: 'Kolkata Knight Riders', password: 'team456', balance: 500000000, players: [] },
    { id: 'team5', name: 'Delhi Capitals', password: 'team567', balance: 500000000, players: [] },
    { id: 'team6', name: 'Punjab Kings', password: 'team678', balance: 500000000, players: [] },
    { id: 'team7', name: 'Rajasthan Royals', password: 'team789', balance: 500000000, players: [] },
    { id: 'team8', name: 'Sunrisers Hyderabad', password: 'team890', balance: 500000000, players: [] },
    { id: 'team9', name: 'Gujarat Titans', password: 'team901', balance: 500000000, players: [] },
    { id: 'team10', name: 'Lucknow Super Giants', password: 'team012', balance: 500000000, players: [] },
    { id: 'team11', name: 'Rising Stars', password: 'team111', balance: 500000000, players: [] },
    { id: 'team12', name: 'Thunderbolts', password: 'team222', balance: 500000000, players: [] },
    { id: 'team13', name: 'Elite Warriors', password: 'team333', balance: 500000000, players: [] },
    { id: 'team14', name: 'Cosmic Blazers', password: 'team444', balance: 500000000, players: [] },
    { id: 'team15', name: 'Astra Legends', password: 'team555', balance: 500000000, players: [] },
    { id: 'team16', name: 'Nova Challengers', password: 'team666', balance: 500000000, players: [] },
];

const ADMINS = [
    { id: 'admin1', name: 'Head Admin', password: 'admin123' },
    { id: 'admin2', name: 'Auctioneer 1', password: 'admin234' },
    { id: 'admin3', name: 'Auctioneer 2', password: 'admin345' },
    { id: 'admin4', name: 'Scout Admin', password: 'admin456' },
    { id: 'admin5', name: 'Super Admin', password: 'admin567' },
];

const PLAYERS_POOL = [
    { id: 1, name: 'Nihal Kankal', basePrice: 2000000, rating: 9.5, category: 'All-rounder' },
    { id: 2, name: 'Abhishek Kanherkar', basePrice: 2000000, rating: 9.2, category: 'Batsman' },
    { id: 3, name: 'Vedant Darokar', basePrice: 1500000, rating: 8.8, category: 'Bowler' },
    { id: 4, name: 'Om Tale', basePrice: 1000000, rating: 8.5, category: 'Batsman' },
    { id: 5, name: 'Dhanashri Borde', basePrice: 1200000, rating: 8.9, category: 'Wicket Keeper' },
    { id: 6, name: 'Pranita Warade', basePrice: 1000000, rating: 8.4, category: 'All-rounder' },
    { id: 7, name: 'Atharva Sonone', basePrice: 1800000, rating: 9.0, category: 'Bowler' },
    { id: 8, name: 'Dolly Bhutada', basePrice: 1100000, rating: 8.7, category: 'Batsman' },
];

const IPLAuction = () => {
    const [user, setUser] = useState(null); // { type: 'admin' | 'team', data: userObj }
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [teams, setTeams] = useState(INITIAL_TEAMS);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [auctionHistory, setAuctionHistory] = useState([]);

    const API_URL = 'http://localhost:5000/api/auction';

    // Fetch State from Server
    const fetchState = async () => {
        try {
            const res = await fetch(`${API_URL}/state`);
            const data = await res.json();
            setTeams(data.teams);
            setCurrentPlayerIndex(data.currentPlayerIndex);
            setAuctionHistory(data.history);
        } catch (err) {
            console.error('Failed to fetch auction state');
        }
    };

    // Update State to Server
    const syncState = async (updatedTeams, updatedIndex, updatedHistory) => {
        try {
            await fetch(`${API_URL}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teams: updatedTeams,
                    currentPlayerIndex: updatedIndex,
                    history: updatedHistory
                })
            });
        } catch (err) {
            console.error('Failed to sync state');
        }
    };

    useEffect(() => {
        fetchState();
        const interval = setInterval(fetchState, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Check Admin
        const adminFound = ADMINS.find(a => a.id === loginId && a.password === password);
        if (adminFound) {
            setUser({ type: 'admin', data: adminFound });
            return;
        }

        // Check Team
        const teamFound = teams.find(t => t.id === loginId && t.password === password);
        if (teamFound) {
            setUser({ type: 'team', data: teamFound });
            return;
        }

        setError('Invalid ID or Password');
    };

    const handleLogout = () => {
        setUser(null);
        setLoginId('');
        setPassword('');
    };

    const formatCurrency = (val) => {
        if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `${(val / 100000).toFixed(2)} Lakh`;
        return `${val}`;
    };

    // --- Admin Actions ---
    const recordPurchase = async (teamId, price) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) return alert('Invalid price');

        const team = teams.find(t => t.id === teamId);
        if (!team) return alert('Select a team');
        if (team.balance < numericPrice) return alert('Insufficient balance');

        const currentPlayer = PLAYERS_POOL[currentPlayerIndex];

        // Update Teams
        const updatedTeams = teams.map(t => {
            if (t.id === teamId) {
                return {
                    ...t,
                    balance: t.balance - numericPrice,
                    players: [...t.players, { ...currentPlayer, boughtPrice: numericPrice }]
                };
            }
            return t;
        });

        const updatedHistory = [{
            player: currentPlayer.name,
            team: team.name,
            price: numericPrice,
            time: new Date().toLocaleTimeString()
        }, ...auctionHistory];

        let nextIndex = currentPlayerIndex;
        if (currentPlayerIndex < PLAYERS_POOL.length - 1) {
            nextIndex = currentPlayerIndex + 1;
        } else {
            alert('Auction Complete!');
        }

        setTeams(updatedTeams);
        setAuctionHistory(updatedHistory);
        setCurrentPlayerIndex(nextIndex);

        await syncState(updatedTeams, nextIndex, updatedHistory);
    };

    const skipPlayer = async () => {
        const updatedHistory = [{
            player: PLAYERS_POOL[currentPlayerIndex].name,
            team: 'UNSOLD',
            price: 0,
            time: new Date().toLocaleTimeString()
        }, ...auctionHistory];

        let nextIndex = currentPlayerIndex;
        if (currentPlayerIndex < PLAYERS_POOL.length - 1) {
            nextIndex = currentPlayerIndex + 1;
        }

        setAuctionHistory(updatedHistory);
        setCurrentPlayerIndex(nextIndex);

        await syncState(teams, nextIndex, updatedHistory);
    };


    if (!user) {
        return (
            <div className="auction-container">
                <div className="login-card">
                    <h2>IPL AUCTION LOGIN</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>User ID</label>
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="Enter ID"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                    {error && <p className="error-msg">{error}</p>}
                </div>
            </div>
        );
    }

    if (user.type === 'admin') {
        const currentPlayer = PLAYERS_POOL[currentPlayerIndex];
        return (
            <div className="auction-container" style={{ display: 'block', overflowY: 'auto' }}>
                <div className="admin-panel">
                    <header className="panel-header">
                        <div>
                            <h3>Manehemet Portal</h3>
                            <h1>Welcome, {user.data.name}</h1>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </header>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Current Player</h3>
                            <div className="value">{currentPlayer?.name || 'N/A'}</div>
                        </div>
                        <div className="stat-card">
                            <h3>Base Price</h3>
                            <div className="value">{currentPlayer ? formatCurrency(currentPlayer.basePrice) : '0'}</div>
                        </div>
                        <div className="stat-card">
                            <h3>Category</h3>
                            <div className="value">{currentPlayer?.category || 'N/A'}</div>
                        </div>
                        <div className="stat-card">
                            <h3>Rating</h3>
                            <div className="value" style={{ color: '#00e5ff' }}>{currentPlayer?.rating || '0.0'}</div>
                        </div>
                    </div>

                    <div className="auction-controls">
                        <div className="player-display">
                            <div className="player-img">👤</div>
                            <h2>{currentPlayer?.name}</h2>
                            <p style={{ color: '#aaa', marginTop: '10px' }}>Rating: {currentPlayer?.rating}/10</p>
                        </div>

                        <div className="bidding-form">
                            <h3 className="form-title">Assign Purchase</h3>
                            <div className="input-group">
                                <label>Sold to Team</label>
                                <select id="boughtByTeam">
                                    <option value="">Select Team</option>
                                    {teams.map(t => (
                                        <option key={t.id} value={t.id}>{t.name} ({formatCurrency(t.balance)})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Final Price (Rupees)</label>
                                <input type="number" id="finalPrice" placeholder="e.g. 5000000" />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    className="login-btn"
                                    onClick={() => {
                                        const teamId = document.getElementById('boughtByTeam').value;
                                        const price = document.getElementById('finalPrice').value;
                                        recordPurchase(teamId, price);
                                    }}
                                >
                                    Confirm Purchase
                                </button>
                                <button className="logout-btn" style={{ padding: '15px', color: '#aaa', borderColor: '#444' }} onClick={skipPlayer}>
                                    Mark Unsold
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="recent-bids">
                        <h3 className="form-title">Auction History</h3>
                        <table className="bids-table">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Status / Team</th>
                                    <th>Price</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auctionHistory.map((h, i) => (
                                    <tr key={i}>
                                        <td>{h.player}</td>
                                        <td style={{ color: h.team === 'UNSOLD' ? '#ff4d4d' : '#00e5ff' }}>{h.team}</td>
                                        <td>{h.price ? formatCurrency(h.price) : '-'}</td>
                                        <td>{h.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Team Portal
    const teamData = teams.find(t => t.id === user.data.id);
    return (
        <div className="auction-container" style={{ display: 'block', overflowY: 'auto' }}>
            <div className="team-panel">
                <header className="panel-header">
                    <div>
                        <h3>Team Dashboard</h3>
                        <h1>Welcome, {teamData.name}</h1>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </header>

                <div className="stats-grid">
                    <div className="stat-card" style={{ borderColor: '#00e5ff' }}>
                        <h3>Remaining Budget</h3>
                        <div className="value" style={{ color: '#00e5ff' }}>{formatCurrency(teamData.balance)}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Players Bought</h3>
                        <div className="value">{teamData.players.length}</div>
                    </div>
                    <div className="stat-card">
                        <h3>Money spent</h3>
                        <div className="value">{formatCurrency(500000000 - teamData.balance)}</div>
                    </div>
                </div>

                <div className="recent-bids">
                    <h3 className="form-title">Your Squad</h3>
                    <table className="bids-table">
                        <thead>
                            <tr>
                                <th>Player Name</th>
                                <th>Category</th>
                                <th>Rating</th>
                                <th>Purchase Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamData.players.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>{p.rating}</td>
                                    <td>{formatCurrency(p.boughtPrice)}</td>
                                </tr>
                            ))}
                            {teamData.players.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No players bought yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IPLAuction;
