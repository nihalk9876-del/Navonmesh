const mongoose = require('mongoose');

const committeeMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    department: { 
        type: String, 
        required: true,
        enum: ['Girls Accommodation', 'Boys Accommodation', 'FOOD', 'SRIJAN TEAM', 'ANKUR TEAM', 'DISCIPLINE TEAM']
    },
    addedBy: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommitteeMember', committeeMemberSchema);
