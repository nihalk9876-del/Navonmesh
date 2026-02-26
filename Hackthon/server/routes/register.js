const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

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
