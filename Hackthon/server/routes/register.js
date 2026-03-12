const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/count', async (req, res) => {
    try {
        const ankurCount = await Registration.countDocuments({ event: 'Ankur (Project Expo)' });
        const srijanCount = await Registration.countDocuments({ event: 'Srijan (Hackathon)' });
        res.json({ ankur: ankurCount, srijan: srijanCount });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching counts' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            event,
            teamName,
            studentCategory,
            problemStatement,
            teamSize,
            leaderName,
            leaderEmail,
            leaderPhone,
            college,
            members,
            utrNumber,
            agreed
        } = req.body;

        // Manually enforce UTR uniqueness just in case the MongoDB index hasn't built
        if (utrNumber && utrNumber.trim() !== "") {
            const existingRegistration = await Registration.findOne({ utrNumber: utrNumber.trim() });
            if (existingRegistration) {
                return res.status(400).json({ error: 'This UTR Number has already been used. Please verify your transaction.' });
            }
        }

        // --- DISABLE SRIJAN REGISTRATIONS ---
        if (event && event.toLowerCase().includes('srijan')) {
            return res.status(403).json({ error: 'Registrations for Srijan (Hackathon) are now closed because all slots are full. Thank you for your interest!' });
        }

        // --- ENFORCE ANKUR RULES ---
        if (event && event.toLowerCase().includes('ankur')) {
            // 1. Block Degree registrations
            if (studentCategory === 'Degree Students') {
                return res.status(403).json({ error: 'Registrations for Degree students in Project Competition are now closed. Only Diploma registrations are open.' });
            }

            // 2. Block if total Ankur count >= 60
            const ankurCount = await Registration.countDocuments({ event: 'Ankur (Project Expo)' });
            if (ankurCount >= 60) {
                return res.status(403).json({ error: 'Registrations for Ankur (Project Expo) are now closed because the maximum limit of 60 teams has been reached.' });
            }
        }

        const newRegistration = new Registration({
            event,
            teamName,
            studentCategory,
            problemStatement,
            teamSize,
            leaderName,
            leaderEmail,
            leaderPhone,
            college,
            members,
            utrNumber,
            agreed
        });

        await newRegistration.save();

        // Determine Event Head based on event type
        let eventHead = { name: "Nihal Kankal", phone: "8766417815" }; // Default
        if (event.includes('Srijan')) {
            eventHead = { name: "Atharva Tayade", phone: "8767968475", role: "Srijan Head" };
        } else if (event.includes('Ankur')) {
            eventHead = { name: "Krushna Kokate", phone: "8261905585", role: "Ankur Head" };
        } else if (event.includes('Udbhav')) {
            eventHead = { name: "Tanmay Kurhekar", phone: "8605359181", role: "Udbhav Head" };
        }

        res.status(201).json({ message: 'Registration successful', data: newRegistration });
    } catch (error) {
        console.error('Registration Error:', error);

        // Handle Mongoose duplicate key error specifically for utrNumber
        if (error.code === 11000 && error.keyPattern && error.keyPattern.utrNumber) {
            return res.status(400).json({ error: 'This UTR Number has already been used for registration.' });
        }

        res.status(500).json({ error: 'Server error during registration' });
    }
});

module.exports = router;
