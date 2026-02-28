const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Accommodation = require('../models/Accommodation');
const Cultural = require('../models/Cultural');

router.post('/login', (req, res) => {
    const { id, password } = req.body;
    const admins = [
        { id: 'nihal1512', password: 'rutuja1512', name: 'Nihal', subRole: 'Overall Head' },
        { id: 'vedu1510', password: 'Vedant@15', name: 'Vedant', subRole: 'Overall Head' },
        { id: 'chakradhar@khamgaon', password: 'khamgaonking', name: 'Chakradhar', subRole: 'Treasurer' },
        { id: 'faculty01', password: 'faculty@01', name: 'Dr. S.S.Jadhao', subRole: 'Convener' }
    ];

    const cleanId = (id || '').trim();
    const cleanPassword = (password || '').trim();

    const adminUser = admins.find(a => a.id === cleanId && a.password === cleanPassword);

    if (adminUser) {
        return res.json({
            success: true,
            token: 'admin_secret_token_navonmesh',
            adminInfo: {
                name: adminUser.name,
                subRole: adminUser.subRole
            }
        });
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
        const cultural = await Cultural.find();
        const accommodation = await Accommodation.find();

        let totalGirls = 0;
        let totalBoys = 0;

        accommodation.forEach(a => {
            totalGirls += a.girlsCount || 0;
            totalBoys += a.boysCount || 0;
        });

        res.json({
            srijan: {
                count: srijan.length,
                entries: srijan.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, problemStatement: r.problemStatement, utrNumber: r.utrNumber, _id: r._id }))
            },
            ankur: {
                count: ankur.length,
                entries: ankur.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, utrNumber: r.utrNumber, _id: r._id, category: r.studentCategory }))
            },
            udbhav: {
                count: udbhav.length,
                entries: udbhav.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, utrNumber: r.utrNumber, _id: r._id }))
            },
            cultural: {
                count: cultural.length,
                entries: cultural
            },
            accommodation: {
                count: accommodation.length,
                totalGirls,
                totalBoys,
                entries: accommodation.map(r => ({
                    event: r.event,
                    teamName: r.teamName,
                    college: r.college,
                    teamSize: r.teamSize,
                    girls: r.girlsCount,
                    boys: r.boysCount,
                    leaderName: r.leaderName,
                    _id: r._id
                }))
            }
        });
    } catch (err) {
        console.error('Error fetching admin data:', err);
        res.status(500).json({ error: 'Server error fetching data' });
    }
});

module.exports = router;
