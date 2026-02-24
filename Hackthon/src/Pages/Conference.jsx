import React from "react";
import "../Styles/projectExpo.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";

const Conference = () => {

    const scheduleItems = [
        {
            title: "Check-in & Registration",
            time: "9:00 AM - 10:00 AM",
            desc: "Attendees check in and receive conference kits.",
            tag: "Mandatory",
            location: "Registration Desk"
        },
        {
            title: "Opening Keynote",
            time: "10:00 AM - 11:30 AM",
            desc: "Welcome address and keynote speech by industry leaders.",
            tag: "Key Event",
            location: "Main Auditorium"
        },
        {
            title: "Panel Discussion",
            time: "1:00 PM - 3:00 PM",
            desc: "Expert panel discussing the future of technology and innovation.",
            tag: "Insightful",
            location: "Conference Hall A"
        },
        {
            title: "Closing Ceremony",
            time: "4:00 PM - 5:00 PM",
            desc: "Vote of thanks and networking session.",
            tag: "Networking",
            location: "Main Hall"
        }
    ];

    return (
        <div className="projectexpo-page ankur-voyager-theme">
            {/* Background elements for depth */}
            <div className="voyager-grid-overlay"></div>
            <div className="voyager-vignette"></div>

            {/* Cinematic Hero Section */}
            <div className="ankur-hero">
                <div className="hero-poster">
                    <div className="poster-frame">
                        <img
                            src="https://images.unsplash.com/photo-1540575861501-7ad0582373f2?q=80&w=2070&auto=format&fit=crop"
                            alt="Udbhav Poster"
                            className="poster-img"
                        />
                        <div className="poster-tech-stats">
                            <div className="stat-line">PULSE: STABLE</div>
                            <div className="stat-line">FREQ: 5.2 GHz</div>
                        </div>
                    </div>
                </div>

                <div className="ankur-intel">
                    <div className="intel-header">
                        <span className="mission-status pulse">SESSION STATUS: READY</span>
                        <h1 className="ankur-main-title">उद्‌भव (STUDENT CONFERENCE)</h1>
                        <div className="ankur-intel-subtitle">NATIONAL STUDENT CONFERENCE</div>
                    </div>

                    <p className="ankur-header-desc">
                        UDBHAV 2026 is a National Student Conference designed to cultivate research aptitude and academic excellence. A formal platform for presenting research papers and innovative concepts.
                    </p>

                    <div className="header-actions">
                        <Link to="/register?event=udbhav" className="ankur-register-btn">
                            REGISTER NOW FOR STUDENT CONFERENCE
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mission Specifications (HUD STYLE) */}
            <div className="ankur-hud-specs">
                <div className="ankur-spec-item">
                    <div className="hud-label">ENTRY_FEE</div>
                    <div className="hud-value">₹300 (PER TEAM)</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="ankur-spec-item">
                    <div className="hud-label">TEAM_SIZE</div>
                    <div className="hud-value">2 - 4 UNIT</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '60%' }}></div></div>
                </div>
                <div className="ankur-spec-item">
                    <div className="hud-label">ELIGIBILITY</div>
                    <div className="hud-value">UG & PG STUDENTS</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="ankur-spec-item">
                    <div className="hud-label">AWARDS</div>
                    <div className="hud-value">BEST PAPER</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '95%' }}></div></div>
                </div>
            </div>

            <div className="ankur-grid">
                {/* Left Column: Details */}
                <div className="ankur-card schedule-card">
                    <div className="card-header">
                        <h2>CONFERENCE INTEL</h2>
                    </div>

                    <div className="timeline-container">
                        <div className="conference-info">
                            <div className="info-section">
                                <h3 style={{ color: "#00e5ff", marginBottom: "20px", fontSize: "1.2rem", fontFamily: 'Orbitron' }}>CONFERENCE TRACKS</h3>
                                <ul className="rules-list">
                                    <li data-index="AI">Artificial Intelligence & Data Science</li>
                                    <li data-index="EV">Renewable Energy & E-Mobility</li>
                                    <li data-index="ID">Smart Systems & Industry 4.0</li>
                                    <li data-index="IT">IoT & Emerging Technologies</li>
                                </ul>
                            </div>

                            <div className="info-section" style={{ marginTop: "40px" }}>
                                <h3 style={{ color: "#00e5ff", marginBottom: "20px", fontSize: "1.2rem", fontFamily: 'Orbitron' }}>KEY HIGHLIGHTS</h3>
                                <ul className="rules-list">
                                    <li data-index=">>">Best Paper Awards Recognition</li>
                                    <li data-index=">>">Formal Research Presentations</li>
                                    <li data-index=">>">Journal Publication Opportunities</li>
                                    <li data-index=">>">Expert Research Networking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Rules */}
                <div className="right-column">
                    <div className="ankur-card rules-card">
                        <div className="card-header">
                            <h2>RULES AND REGULATIONS</h2>
                        </div>
                        <div className="rules-container">
                            <ul className="rules-list">
                                <li data-index="01">Attendees must carry a valid ID card and registration confirmation.</li>
                                <li data-index="02">Please be seated 15 minutes before the sessions begin.</li>
                                <li data-index="03">Mobile phones must be on silent mode during sessions.</li>
                                <li data-index="04">Respect the speakers and other attendees during Q&A sessions.</li>
                                <li data-index="05">Recording of sessions is permitted only with prior approval.</li>
                                <li data-index="06">Keep the venue clean and dispose of trash in designated bins.</li>
                                <li data-index="07">Networking is encouraged during break times.</li>
                                <li data-index="08">Certificates will be provided to all registered attendees.</li>
                                <li data-index="09">Final schedule is subject to change. Check for updates.</li>
                            </ul>

                            <button className="ankur-download-btn">DOWNLOAD SYMPOSIUM BRIEF</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conference;
