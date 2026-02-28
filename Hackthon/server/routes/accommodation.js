const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');
const sendEmail = require('../utils/email');

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

        // Send confirmation email asynchronously
        const emailContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0d0d1a; color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #c084fc; font-family: 'Orbitron', sans-serif;">NAVONMESH 2026</h1>
                    <p style="color: #94a3b8; font-size: 14px;">Accommodation Request Received!</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px;">
                    <p>Dear <strong>${leaderName}</strong>,</p>
                    <p>We have received your accommodation request for <strong>Navonmesh 2026</strong>.</p>
                    <div style="margin-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 10px;">
                        <p style="color: #a78bfa; font-weight: bold;">Requisition Details:</p>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Event:</strong> ${event}</li>
                            <li><strong>Team Name:</strong> ${teamName}</li>
                            <li><strong>Team Leader:</strong> ${leaderName}</li>
                            <li><strong>Total Persons:</strong> ${teamSize} (Girls: ${girlsCount}, Boys: ${boysCount})</li>
                        </ul>
                    </div>

                    <div style="margin-top: 25px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 15px;">
                        <p style="color: #a78bfa; font-weight: bold; margin-bottom: 10px;">For any queries, contact:</p>
                        <div style="font-size: 14px; line-height: 1.6;">
                            <p style="margin: 5px 0;"><strong>Hospitality / Acco. Head:</strong> Ajinkya Surange - 9604765998</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Nihal Kankal - 8766417815</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Vedant Darokar - 8208772402</p>
                        </div>
                    </div>

                    <p style="margin-top: 25px;">Our hospitality team will review your request and get back to you soon. Please ensure you have completed your event registration payment.</p>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
                    <p>Regards,<br>Hospitality Team, Navonmesh</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        `;

        // Collect all emails
        const recipientList = [leaderEmail];
        if (members && Array.isArray(members)) {
            members.forEach(m => {
                if (m.email && m.email.trim() !== "") recipientList.push(m.email.trim());
            });
        }

        // Send response immediately so the user doesn't wait
        res.status(201).json({ message: 'Accommodation request submitted successfully', data: newAccommodation });

        // Fire and forget email sending in the background
        sendEmail({
            to: recipientList.join(', '),
            subject: `Accommodation Request Received - Navonmesh 2026`,
            htmlContent: emailContent
        }).catch(err => console.error('Async Email Error:', err));
    } catch (error) {
        console.error('Accommodation Error:', error);
        res.status(500).json({ error: 'Server error during accommodation registration' });
    }
});

module.exports = router;
