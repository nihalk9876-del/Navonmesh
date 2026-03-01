const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    return transporter;
};

const sendEmail = async (options) => {
    try {

        const mailOptions = {
            from: `"Navonmesh 2026" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.htmlContent
        };

        const info = await getTransporter().sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

module.exports = sendEmail;
