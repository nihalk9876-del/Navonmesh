const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Accommodation = require('../models/Accommodation');
const Cultural = require('../models/Cultural');
const sendEmail = require('../utils/email');

router.post('/login', (req, res) => {
    const { id, password } = req.body;
    const admins = [
        { id: 'nihal1512', password: 'rutuja1512', name: 'Nihal', subRole: 'Overall Head' },
        { id: 'vedu1510', password: 'Vedant@15', name: 'Vedant', subRole: 'Overall Head' },
        { id: 'chakradhar@khamgaon', password: 'khamgaonking', name: 'Chakradhar', subRole: 'Treasurer' },
        { id: 'faculty01', password: 'faculty@01', name: 'Dr. S.S.Jadhao', subRole: 'Convener' }
    ];

    const cleanId = (id || '').trim();
    const cleanPassword = (password || '').trim();

    const adminUser = admins.find(a => a.id === cleanId && a.password === cleanPassword);

    if (adminUser) {
        return res.json({
            success: true,
            token: 'admin_secret_token_navonmesh',
            adminInfo: {
                name: adminUser.name,
                subRole: adminUser.subRole
            }
        });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
    }
});

// Fetch all entries count and data
router.get('/data', async (req, res) => {
    // Auth Check
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer admin_secret_token_navonmesh') {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    try {
        const srijan = await Registration.find({ event: 'Srijan (Hackathon)' });
        const ankur = await Registration.find({ event: 'Ankur (Project Expo)' });
        const udbhav = await Registration.find({ event: 'Udbhav (Conference)' });
        const cultural = await Cultural.find();
        const accommodation = await Accommodation.find();

        let totalGirls = 0;
        let totalBoys = 0;

        accommodation.forEach(a => {
            totalGirls += a.girlsCount || 0;
            totalBoys += a.boysCount || 0;
        });

        res.json({
            srijan: {
                count: srijan.length,
                entries: srijan.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, problemStatement: r.problemStatement, utrNumber: r.utrNumber, paymentVerified: r.paymentVerified, _id: r._id }))
            },
            ankur: {
                count: ankur.length,
                entries: ankur.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, utrNumber: r.utrNumber, paymentVerified: r.paymentVerified, _id: r._id, category: r.studentCategory }))
            },
            udbhav: {
                count: udbhav.length,
                entries: udbhav.map(r => ({ teamName: r.teamName, teamSize: r.teamSize, leaderName: r.leaderName, college: r.college, utrNumber: r.utrNumber, paymentVerified: r.paymentVerified, _id: r._id }))
            },
            cultural: {
                count: cultural.length,
                entries: cultural.map(r => ({ ...r._doc, paymentVerified: r.paymentVerified }))
            },
            accommodation: {
                count: accommodation.length,
                totalGirls,
                totalBoys,
                entries: accommodation.map(r => ({
                    event: r.event,
                    teamName: r.teamName,
                    college: r.college,
                    teamSize: r.teamSize,
                    girls: r.girlsCount,
                    boys: r.boysCount,
                    leaderName: r.leaderName,
                    _id: r._id
                }))
            }
        });
    } catch (err) {
        console.error('Error fetching admin data:', err);
        res.status(500).json({ error: 'Server error fetching data' });
    }
});

// Send confirmation email after UTR check
router.post('/send-confirmation/:id', async (req, res) => {
    // Auth Check
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer admin_secret_token_navonmesh') {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    try {
        const teamId = req.params.id;
        const reg = await Registration.findById(teamId);

        if (!reg) return res.status(404).json({ error: 'Team not found' });
        if (reg.paymentVerified) return res.status(400).json({ error: 'Email already sent' });

        // Collect all emails
        const emails = [reg.leaderEmail, ...reg.members.map(m => m.email)].filter(Boolean);

        // Define contacts
        let eventHeadContact = '';
        if (reg.event.includes('Srijan')) {
            eventHeadContact = 'Atharva Tayade (+91 8767968475)';
        } else if (reg.event.includes('Ankur')) {
            eventHeadContact = 'Krushna Kokate (+91 8261905585)';
        } else if (reg.event.includes('Udbhav')) {
            eventHeadContact = 'Tanmay Kurhekar (+91 8605359181)';
        }

        const overallHeads = 'Overall Heads Contacts: Nihal Kankal (+91 8766417815), Vedant Darokar (+91 8208772402)';

        // HTML Content
        const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Navonmesh '26</h1>
                <p style="color: #a8c0ff; margin: 10px 0 0 0; font-size: 16px;">The Horizon of Innovation</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px; color: #333333;">
                <h2 style="color: #1a1a1a; margin-top: 0; font-size: 24px;">Registration Confirmed! 🎉</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Hello <strong>${reg.leaderName}</strong> and Team <strong style="color: #2a5298;">${reg.teamName}</strong>,
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Get ready to blast off! We're thrilled to inform you that your registration for <strong>${reg.event}</strong> has been successfully verified. 
                    Your payment is confirmed, and your team is officially onboard.
                </p>

                <!-- Team Details Card -->
                <div style="background-color: #f8f9fa; border-left: 4px solid #2a5298; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <h3 style="margin-top: 0; color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Mission Details</h3>
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Team Name:</strong> <span style="font-weight: 600;">${reg.teamName}</span></li>
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Category:</strong> ${reg.event}</li>
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Leader:</strong> ${reg.leaderName}</li>
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Crew Size:</strong> ${reg.teamSize} Member(s)</li>
                        ${reg.college ? `<li style="margin-bottom: 0;"><strong style="color: #555;">Institute:</strong> ${reg.college}</li>` : ''}
                    </ul>
                </div>

                <!-- Contact Section -->
                <h3 style="color: #1a1a1a; font-size: 18px; margin-top: 30px;">Need Assistance?</h3>
                <p style="font-size: 15px; color: #666; margin-bottom: 10px;">Reach out to your event commanders:</p>
                <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px;">
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #333;">
                        <li style="margin-bottom: 8px;">👨‍🚀 <strong>Event Head:</strong> ${eventHeadContact}</li>
                        <li>👑 <strong>Overall Heads:</strong> Nihal Kankal (+91 8766417815) <br> <span style="margin-left:24px;">Vedant Darokar (+91 8208772402)</span></li>
                    </ul>
                </div>

                <div style="margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 30px;">
                    <p style="font-size: 18px; color: #2a5298; font-weight: bold; margin-bottom: 5px;">See you at Navonmesh '26!</p>
                    <p style="font-size: 14px; color: #888; margin: 0; margin-bottom: 10px;">Further updates will be sent to you on WhatsApp and via Email.</p>
                    <p style="font-size: 14px; color: #888; margin: 0;">- Navonmesh '26 Organizing Committee</p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                <p style="margin: 0;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
        `;

        const mailSuccess = await sendEmail({
            to: emails,
            subject: `Registration Confirmed - Navonmesh 2026 (${reg.teamName})`,
            htmlContent
        });

        if (mailSuccess) {
            reg.paymentVerified = true;
            await reg.save();
            return res.json({ success: true, message: 'Confirmation email sent successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to send email' });
        }

    } catch (err) {
        console.error('Email sending error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Send confirmation email for Cultural event
router.post('/cultural/send-confirmation/:id', async (req, res) => {
    // Auth Check
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer admin_secret_token_navonmesh') {
        return res.status(401).json({ error: 'Unauthorized Access' });
    }

    try {
        const participantId = req.params.id;
        const reg = await Cultural.findById(participantId);

        if (!reg) return res.status(404).json({ error: 'Participant not found' });
        if (reg.paymentVerified) return res.status(400).json({ error: 'Email already sent' });

        // Collect all emails
        const emails = [reg.email].filter(Boolean);

        // Define contacts
        const eventHeadContact = 'Sushant Akhare (+91 97631 82186)';
        const overallHeads = 'Overall Heads Contacts: Nihal Kankal (+91 8766417815), Vedant Darokar (+91 8208772402)';

        // HTML Content
        const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #cc2b5e 0%, #753a88 100%); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Navonmesh '26</h1>
                <p style="color: #ffb8d2; margin: 10px 0 0 0; font-size: 16px;">कलास्पंदन '26</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px; color: #333333;">
                <h2 style="color: #1a1a1a; margin-top: 0; font-size: 24px;">Registration Confirmed! 🎉</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Hello <strong style="color: #cc2b5e;">${reg.participantName}</strong>,
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #555555;">
                    Get ready to shine on stage! We're thrilled to inform you that your registration for the <strong>Cultural Event (कलास्पंदन)</strong> has been successfully verified. 
                    Your payment is confirmed, and you are officially onboard.
                </p>

                <!-- Performance Details Card -->
                <div style="background-color: #fcf5f8; border-left: 4px solid #cc2b5e; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <h3 style="margin-top: 0; color: #1a1a1a; font-size: 18px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Performance Details</h3>
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Participant:</strong> <span style="font-weight: 600;">${reg.participantName}</span></li>
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Activity:</strong> ${reg.activity}</li>
                        <li style="margin-bottom: 10px;"><strong style="color: #555;">Class/Branch:</strong> ${reg.className}</li>
                        ${reg.member2Name ? `<li style="margin-bottom: 10px;"><strong style="color: #555;">Partner Name:</strong> ${reg.member2Name}</li>` : ''}
                        ${reg.groupSize ? `<li style="margin-bottom: 10px;"><strong style="color: #555;">Group Size:</strong> ${reg.groupSize} Members</li>` : ''}
                        ${reg.college ? `<li style="margin-bottom: 0;"><strong style="color: #555;">Institute:</strong> ${reg.college}</li>` : ''}
                    </ul>
                </div>

                <!-- Contact Section -->
                <h3 style="color: #1a1a1a; font-size: 18px; margin-top: 30px;">Need Assistance?</h3>
                <p style="font-size: 15px; color: #666; margin-bottom: 10px;">Reach out to your event commanders:</p>
                <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px;">
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #333;">
                        <li style="margin-bottom: 8px;">🎭 <strong>Cultural Head:</strong> ${eventHeadContact}</li>
                        <li>👑 <strong>Overall Heads:</strong> Nihal Kankal (+91 8766417815) <br> <span style="margin-left:24px;">Vedant Darokar (+91 8208772402)</span></li>
                    </ul>
                </div>

                <div style="margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 30px;">
                    <p style="font-size: 18px; color: #cc2b5e; font-weight: bold; margin-bottom: 5px;">See you at Navonmesh '26!</p>
                    <p style="font-size: 14px; color: #888; margin: 0; margin-bottom: 10px;">Further updates will be sent to you on WhatsApp and via Email.</p>
                    <p style="font-size: 14px; color: #888; margin: 0;">- Navonmesh '26 Organizing Committee</p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                <p style="margin: 0;">This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
        `;

        const mailSuccess = await sendEmail({
            to: emails,
            subject: `Registration Confirmed - Navonmesh 2026 Cultural Event`,
            htmlContent
        });

        if (mailSuccess) {
            reg.paymentVerified = true;
            await reg.save();
            return res.json({ success: true, message: 'Confirmation email sent successfully' });
        } else {
            return res.status(500).json({ error: 'Failed to send email' });
        }

    } catch (err) {
        console.error('Email sending error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
