const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.join(__dirname, '../data/messages.json');

// Helper to read 
const getMessages = () => {
    try {
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Start ID helper
const getNextId = (items) => {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
};

// Submit Message
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        console.log("Receiving message from:", email);

        const messages = getMessages();

        const newMessage = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            date: new Date()
        };

        messages.push(newMessage);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

        console.log("Message saved.");
        res.json(newMessage);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
