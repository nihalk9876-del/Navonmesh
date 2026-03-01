const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
    if (!transporter) {
        console.log('Initializing SMTP Transporter for Gmail...');
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
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 10000,
            logger: true,
            debug: true
        });
    }
    return transporter;
};

const sendEmail = async (options) => {
    try {
        console.log(`Attempting to send email to: ${options.to}`);
        console.log(`Using EMAIL_USER: ${process.env.EMAIL_USER ? 'SET (OK)' : 'NOT SET (ERROR)'}`);

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
