import React from "react";
import "../Styles/projectExpo.css"; // Reusing Project Expo styles
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";

const Conference = () => {

    const scheduleItems = [
        {
            title: "Check-in & Registration",
            time: "9:00 AM - 10:00 AM",
            desc: "Attendees check in and receive conference kits.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Registration Desk",
            dotColor: "pink"
        },
        {
            title: "Opening Keynote",
            time: "10:00 AM - 11:30 AM",
            desc: "Welcome address and keynote speech by industry leaders.",
            tag: "Key Event",
            tagColor: "purple",
            location: "Main Auditorium",
            dotColor: "purple"
        },
        {
            title: "Panel Discussion",
            time: "1:00 PM - 3:00 PM",
            desc: "Expert panel discussing the future of technology and innovation.",
            tag: "Insightful",
            tagColor: "blue",
            location: "Conference Hall A",
            dotColor: "purple"
        },
        {
            title: "Closing Ceremony",
            time: "4:00 PM - 5:00 PM",
            desc: "Vote of thanks and networking session.",
            tag: "Networking",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        }
    ];

    return (
        <div className="projectexpo-page">
            {/* Header Section */}
            <div className="projectexpo-header">
                <h1 className="main-title">उद्‌भव</h1>
                <div className="vertical-divider"></div>
                <p className="header-desc">
                    Udbhav is a National Student Conference designed to cultivate research aptitude and academic excellence among students. It offers a formal platform for students to present research papers, case studies, and innovative concepts.
                </p>
            </div>

            <div className="projectexpo-grid">
                {/* Left Column: Schedule */}
                <div className="projectexpo-card schedule-card">
                    <div className="card-header">
                        <h2>Conference Details</h2>
                    </div>

                    <div className="conference-info">
                        <div className="info-section">
                            <h3 style={{ color: "#d142f5", marginBottom: "15px", fontSize: "1.4rem" }}>Conference Tracks</h3>
                            <ul className="rules-list">
                                <li>Artificial Intelligence, Machine Learning & Data Science</li>
                                <li>Renewable Energy, E-Mobility & Sustainability</li>
                                <li>Smart Systems, Automation and Industry 4.0</li>
                                <li>IoT and Emerging Communication Technologies</li>
                            </ul>
                        </div>

                        <div className="info-section" style={{ marginTop: "30px" }}>
                            <h3 style={{ color: "#d142f5", marginBottom: "15px", fontSize: "1.4rem" }}>Key Highlights</h3>
                            <ul className="rules-list">
                                <li>Best Paper Awards</li>
                                <li>Paper presentations</li>
                                <li>Selected Papers will be recommended for Journal publication</li>
                                <li>Interaction with researchers & academicians</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: CTA & Rules */}
                <div className="right-column">
                    {/* CTA Section */}
                    <div className="projectexpo-cta">
                        <div className="entry-fee">
                            Entry Fee: ₹300
                        </div>
                        <h2 className="cta-title">Register now and Secure your Seat.</h2>
                        <Link to="/register?event=udbhav">
                            <img src={registerBtnImg} alt="Register Now" className="register-btn-img" />
                        </Link>
                    </div>

                    {/* Rules & Regulations */}
                    <div className="projectexpo-card rules-card">
                        <div className="card-header">
                            <h2>Conference Rules</h2>
                        </div>

                        <ul className="rules-list">
                            <li>Attendees must carry a valid ID card and registration confirmation.</li>
                            <li>Please be seated 15 minutes before the sessions begin.</li>
                            <li>Mobile phones must be on silent mode during sessions.</li>
                            <li>Respect the speakers and other attendees during Q&A sessions.</li>
                            <li>Recording of sessions is permitted only with prior approval.</li>
                            <li>Keep the venue clean and dispose of trash in designated bins.</li>
                            <li>Networking is encouraged during break times.</li>
                            <li>Certificates will be provided to all registered attendees.</li>
                            <li>Final schedule is subject to change. Check for updates.</li>
                        </ul>

                        <div className="download-btn-container">
                            <button className="download-btn">Download Brochure</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conference;
