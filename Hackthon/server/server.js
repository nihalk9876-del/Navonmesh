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
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Connect to MongoDB
// Connect to MongoDB
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

console.log("Running in File-System Mode (No MongoDB required)");
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));

app.get('/', (req, res) => {
    res.send('Navonmesh Hackathon API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
