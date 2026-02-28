const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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
