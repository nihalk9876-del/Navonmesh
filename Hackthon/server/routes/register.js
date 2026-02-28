const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const sendEmail = require('../utils/email');

router.post('/', async (req, res) => {
    try {
        const {
            event,
            teamName,
            studentCategory,
            problemStatement,
            teamSize,
            leaderName,
            leaderEmail,
            leaderPhone,
            college,
            members,
            utrNumber,
            agreed
        } = req.body;

        // Manually enforce UTR uniqueness just in case the MongoDB index hasn't built
        if (utrNumber && utrNumber.trim() !== "") {
            const existingRegistration = await Registration.findOne({ utrNumber: utrNumber.trim() });
            if (existingRegistration) {
                return res.status(400).json({ error: 'This UTR Number has already been used. Please verify your transaction.' });
            }
        }

        const newRegistration = new Registration({
            event,
            teamName,
            studentCategory,
            problemStatement,
            teamSize,
            leaderName,
            leaderEmail,
            leaderPhone,
            college,
            members,
            utrNumber,
            agreed
        });

        await newRegistration.save();

        // Determine Event Head based on event type
        let eventHead = { name: "Nihal Kankal", phone: "8766417815" }; // Default
        if (event.includes('Srijan')) {
            eventHead = { name: "Atharva Tayade", phone: "8767968475", role: "Srijan Head" };
        } else if (event.includes('Ankur')) {
            eventHead = { name: "Krushna Kokate", phone: "8261905585", role: "Ankur Head" };
        } else if (event.includes('Udbhav')) {
            eventHead = { name: "Tanmay Kurhekar", phone: "8605359181", role: "Udbhav Head" };
        }

        // Send confirmation email asynchronously (don't wait for it to respond to the user)
        const isIndividual = teamName === 'Individual' || teamSize === 1;
        const greeting = isIndividual ? `Dear <strong>${leaderName}</strong>,` : `Dear <strong>${teamName}</strong> members,`;
        const successLine = isIndividual ? `Congratulations! You have been successfully registered for <strong>${event}</strong>.` : `Congratulations! Your team has been successfully registered for <strong>${event}</strong>.`;

        const emailContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #0d0d1a; color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #c084fc; font-family: orbital, sans-serif;">NAVONMESH 2026</h1>
                    <p style="color: #94a3b8; font-size: 14px;">Registration Confirmed!</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px;">
                    <p>${greeting}</p>
                    <p>${successLine}</p>
                    <div style="margin-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 10px;">
                        <p style="color: #a78bfa; font-weight: bold;">Registration Details:</p>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Event:</strong> ${event}</li>
                            ${!isIndividual ? `<li><strong>Team Name:</strong> ${teamName}</li>` : ''}
                            <li><strong>Name:</strong> ${leaderName}</li>
                            <li><strong>Type:</strong> ${isIndividual ? 'Individual Entry' : 'Team Entry'}</li>
                            ${!isIndividual ? `<li><strong>Team Size:</strong> ${teamSize}</li>` : ''}
                            <li><strong>Problem/Category:</strong> ${problemStatement || studentCategory || 'N/A'}</li>
                            <li><strong>UTR Number:</strong> ${utrNumber}</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 25px; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 15px;">
                        <p style="color: #a78bfa; font-weight: bold; margin-bottom: 10px;">For any queries, contact:</p>
                        <div style="font-size: 14px; line-height: 1.6;">
                            <p style="margin: 5px 0;"><strong>${eventHead.role}:</strong> ${eventHead.name} - ${eventHead.phone}</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Nihal Kankal - 8766417815</p>
                            <p style="margin: 5px 0;"><strong>Overall Head:</strong> Vedant Darokar - 8208772402</p>
                        </div>
                    </div>

                    <p style="margin-top: 25px;">We look forward to seeing you at the event. Stay tuned for further updates!</p>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8;">
                    <p>Regards,<br>Team Navonmesh</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        `;

        // Collect all recipient emails
        const recipientList = [leaderEmail];
        if (members && Array.isArray(members)) {
            members.forEach(m => {
                if (m.email && m.email.trim() !== "") recipientList.push(m.email.trim());
            });
        }

        sendEmail({
            to: recipientList.join(', '), // Nodemailer works best with comma separated strings
            subject: `Registration Confirmation - Navonmesh 2026 (${event})`,
            htmlContent: emailContent
        }).catch(err => console.error('Silent email error:', err));

        res.status(201).json({ message: 'Registration successful', data: newRegistration });
    } catch (error) {
        console.error('Registration Error:', error);

        // Handle Mongoose duplicate key error specifically for utrNumber
        if (error.code === 11000 && error.keyPattern && error.keyPattern.utrNumber) {
            return res.status(400).json({ error: 'This UTR Number has already been used for registration.' });
        }

        res.status(500).json({ error: 'Server error during registration' });
    }
});

module.exports = router;
