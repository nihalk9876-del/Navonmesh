const express = require('express');
const router = express.Router();
const Cultural = require('../models/Cultural');
const sendEmail = require('../utils/email');

// POST: Register for Cultural event
router.post('/', async (req, res) => {
    try {
        const {
            participantName,
            college,
            className,
            activity,
            member2Name,
            member2Class,
            contact,
            email,
            groupSize
        } = req.body;

        const newRegistration = new Cultural({
            participantName,
            college,
            className,
            activity,
            member2Name,
            member2Class,
            contact,
            email,
            groupSize
        });

        await newRegistration.save();

        // Send confirmation email asynchronously
        const emailContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0d0d1a; color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #c084fc; font-family: 'Orbitron', sans-serif;">NAVONMESH 2026</h1>
                    <p style="color: #94a3b8; font-size: 14px;">Cultural Event Registration Confirmed!</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px;">
                    <p>Dear <strong>${participantName}</strong>,</p>
                    <p>Thank you for registering for the <strong>${activity}</strong> (Kala Spandan) at Navonmesh 2026.</p>
                    <div style="margin-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 10px;">
                        <p style="color: #a78bfa; font-weight: bold;">Registration Details:</p>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Activity:</strong> ${activity}</li>
                            <li><strong>College:</strong> ${college}</li>
                            <li><strong>Class:</strong> ${className}</li>
                            <li><strong>Participant Name:</strong> ${participantName}</li>
                        </ul>
                    </div>

                    <div style="margin-top: 25px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 15px;">
                        <p style="color: #a78bfa; font-weight: bold; margin-bottom: 10px;">For any queries, contact:</p>
                        <div style="font-size: 14px; line-height: 1.6;">
                            <p style="margin: 5px 0;"><strong>Cultural Head:</strong> Sushant Akhare - 9763182186</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Nihal Kankal - 8766417815</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Vedant Darokar - 8208772402</p>
                        </div>
                    </div>

                    <p style="margin-top: 25px;">Get your performance ready! We look forward to seeing your talent on stage.</p>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
                    <p>Regards,<br>Team Navonmesh</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        `;

        // Send response immediately so the user doesn't wait
        res.status(201).json({ message: 'Registration successful', data: newRegistration });

        // Fire and forget email sending in the background
        sendEmail({
            to: email,
            subject: `Cultural Registration Confirmation - Navonmesh 2026 (${activity})`,
            htmlContent: emailContent
        }).catch(err => console.error('Async Email Error:', err));
    } catch (error) {
        console.error('Cultural Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// GET: Get all cultural registrations (for admin)
router.get('/', async (req, res) => {
    try {
        const registrations = await Cultural.find().sort({ registrationDate: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Server error fetching registrations' });
    }
});

module.exports = router;
