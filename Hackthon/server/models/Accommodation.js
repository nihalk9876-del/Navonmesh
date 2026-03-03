const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] }
});

const AccommodationSchema = new mongoose.Schema({
    event: { type: String, required: true }, // SRIJAN, ANKUR, UDBHAV
    teamName: { type: String, required: true },
    college: { type: String, required: true },
    teamSize: { type: Number, default: 0 },
    girlsCount: { type: Number, default: 0 },
    boysCount: { type: Number, default: 0 },

    // Leader info
    leaderName: { type: String, required: true },
    leaderPhone: { type: String, required: true },
    leaderEmail: { type: String, required: true },
    leaderGender: { type: String, required: true },

    // Other members
    members: [MemberSchema],
    paymentVerified: { type: Boolean, default: false },

    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accommodation', AccommodationSchema);
