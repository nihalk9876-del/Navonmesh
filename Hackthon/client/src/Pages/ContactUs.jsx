import React, { useState } from "react";
import "../Styles/contactUs.css";
import { FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamPlaceholder from "../assets/team_placeholder.jpg";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('Message Sent Successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus(''), 3000);
            } else {
                setStatus('Failed to send message.');
            }
        } catch (err) {
            console.error(err);
            setStatus('Error sending message.');
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
                Have questions? Reach out to us directly.
            </p>

            <div className="contact-content-grid" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="contact-form-wrapper" style={{ width: '100%', maxWidth: '600px' }}>
                    <form className="contact-form" onSubmit={onSubmit}>
                        <h2>Send a Message</h2>
                        {status && <p style={{ color: status.includes('Success') ? 'green' : 'red', textAlign: 'center' }}>{status}</p>}

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                value={formData.message}
                                onChange={onChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
