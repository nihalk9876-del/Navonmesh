import React from "react";
import "../Styles/contactUs.css";
import { FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamPlaceholder from "../assets/team_placeholder.jpg";

const ContactUs = () => {
    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">
                Have questions? Reach out to us directly.
            </p>

            <div className="contact-content-grid" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="contact-form-wrapper" style={{ width: '100%', maxWidth: '600px' }}>
                    <form
                        className="contact-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const name = e.target.name.value;
                            const email = e.target.email.value;
                            const subject = e.target.subject.value;
                            const message = e.target.message.value;

                            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                            window.location.href = `mailto:nihalk9876@gmail.com?subject=${encodeURIComponent(
                                subject
                            )}&body=${encodeURIComponent(body)}`;
                        }}
                    >
                        <h2>Send a Message</h2>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="What is this about?" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
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
