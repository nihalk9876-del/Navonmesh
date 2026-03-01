const mongoose = require('mongoose');

const CulturalSchema = new mongoose.Schema({
    participantName: { type: String, required: true },
    college: { type: String, required: true, default: 'Shri Sant Gajanan Maharaj College of Engineering Shegaon' },
    className: { type: String, required: true },
    activity: { type: String, required: true },

    // For Duo or Group performances
    member2Name: { type: String },
    member2Class: { type: String },
    groupSize: { type: Number }, // added for group dance/performances

    contact: { type: String, required: true },
    email: { type: String, required: true },
    paymentVerified: { type: Boolean, default: false }, // Track email delivery status
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cultural', CulturalSchema);
