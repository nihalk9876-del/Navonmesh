const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// Simple Admin Login
router.post('/login', (req, res) => {
    const { id, password } = req.body;

    // In production, these should be safely stored in .env or a separate DB collection
    const adminId = process.env.ADMIN_ID || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'navonmesh2026';

    if (id === adminId && password === adminPass) {
        return res.json({ success: true, token: 'admin_secret_token_navonmesh' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }
});

// Fetch all entries count and data
router.get('/data', async (req, res) => {
    // Auth Check
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer admin_secret_token_navonmesh') {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    try {
        const srijan = await Registration.find({ event: 'Srijan (Hackathon)' });
        const ankur = await Registration.find({ event: 'Ankur (Project Expo)' });
        const udbhav = await Registration.find({ event: 'Udbhav (Conference)' });

        res.json({
            srijan: {
                count: srijan.length,
                entries: srijan.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, problemStatement: r.problemStatement, utrNumber: r.utrNumber, _id: r._id }))
            },
            ankur: {
                count: ankur.length,
                entries: ankur.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, utrNumber: r.utrNumber, _id: r._id, category: r.studentCategory }))
            },
            udbhav: {
                count: udbhav.length,
                entries: udbhav.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, utrNumber: r.utrNumber, _id: r._id }))
            }
        });
    } catch (err) {
        console.error('Error fetching admin data:', err);
        res.status(500).json({ error: 'Server error fetching data' });
    }
});

module.exports = router;
