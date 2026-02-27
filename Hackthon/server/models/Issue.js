const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    groupNumber: {
        type: Number,
        required: true
    },
    issueDescription: {
        type: String,
        trim: true,
        default: 'General Assistance Required'
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Issue', issueSchema);
