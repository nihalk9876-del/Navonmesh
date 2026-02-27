const express = require('express');
const router = express.Router();
const Cultural = require('../models/Cultural');

// POST: Register for Cultural event
router.post('/', async (req, res) => {
    try {
        const {
            participantName,
            college,
            className,
            activity,
            member2Name,
            member2Class,
            contact,
            email,
            groupSize
        } = req.body;

        const newRegistration = new Cultural({
            participantName,
            college,
            className,
            activity,
            member2Name,
            member2Class,
            contact,
            email,
            groupSize
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful', data: newRegistration });
    } catch (error) {
        console.error('Cultural Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// GET: Get all cultural registrations (for admin)
router.get('/', async (req, res) => {
    try {
        const registrations = await Cultural.find().sort({ registrationDate: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching registrations' });
    }
});

module.exports = router;
