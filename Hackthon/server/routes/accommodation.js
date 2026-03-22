const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

router.post('/', async (req, res) => {
    try {
        const {
            event,
            teamName,
            college,
            teamSize,
            girlsCount,
            boysCount,
            leaderName,
            leaderPhone,
            leaderEmail,
            leaderGender,
            members
        } = req.body;

        const newAccommodation = new Accommodation({
            event,
            teamName,
            college,
            teamSize,
            girlsCount,
            boysCount,
            leaderName,
            leaderPhone,
            leaderEmail,
            leaderGender,
            members
        });

        await newAccommodation.save();

        res.status(201).json({ message: 'Accommodation request submitted successfully', data: newAccommodation });
    } catch (error) {
        console.error('Accommodation Error:', error);
        res.status(500).json({ error: 'Server error during accommodation registration' });
    }
});

module.exports = router;
