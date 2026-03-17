const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    eventId: { type: String, default: 'global_break_timer' },
    endTime: { type: Date, default: () => new Date(Date.now() + 86400 * 1000) },
    pausedAt: { type: Date, default: null }, // If null, timer is running
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Timer', timerSchema);
