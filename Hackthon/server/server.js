const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    // Only log if it's NOT a polling request to /api/issues
    if (!(req.method === 'GET' && req.url === '/api/issues')) {
        console.log(`${req.method} request to ${req.url}`);
    }
    next();
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/register', require('./routes/register'));
app.use('/api/accommodation', require('./routes/accommodation'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/cultural', require('./routes/cultural'));

app.get('/', (req, res) => {
    res.send('Navonmesh Hackathon API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
