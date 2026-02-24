import React from "react";
import "../Styles/projectExpo.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import udbhavPoster from "../assets/STUDENT CONFERENCE.png";

const Conference = () => {
    const [mobileSection, setMobileSection] = React.useState(null);

    const toggleMobileSection = (section) => {
        setMobileSection(prev => prev === section ? null : section);
    };

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

    const [showAll, setShowAll] = React.useState(false);
    const displayedItems = showAll ? scheduleItems : scheduleItems.slice(0, 5);

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
                            src={udbhavPoster}
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
                        <div className="mission-status-container">
                            <span className="mission-status pulse">● MISSION STATUS: ANALYZING</span>
                            <span className="mission-status-tech">INTEL_NODE STATUS: ACTIVE</span>
                        </div>
                        <h1 className="ankur-main-title">
                            <span className="hindi-title">उद्‌भव</span>
                            <span className="english-title">(STUDENT CONFERENCE)</span>
                        </h1>
                        <div className="ankur-intel-subtitle">NATIONAL STUDENT CONFERENCE</div>
                    </div>

                    <div className="intel-description-box">
                        <span className="box-label">MISSION_DESCRIPTION</span>
                        <p className="ankur-header-desc">
                            UDBHAV 2026 is a National Student Conference designed to cultivate research aptitude and academic excellence. A formal platform for presenting research papers and innovative concepts.
                        </p>
                        <div className="intel-accents">
                            <div className="accent-bar"></div>
                            <div className="accent-dots"></div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <Link to="/register?event=udbhav" className="register-rocket-btn animate-float">
                            <span className="reg-text">REGISTER FOR UDBHAV</span>
                            <div className="reg-icon-circle">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <div className="rocket-exhaust"></div>
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
                    <div className="hud-label">RECOGNITION</div>
                    <div className="hud-value">BEST PAPER AWARD</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '95%' }}></div></div>
                </div>
            </div>

            {/* Mobile Toggle Buttons */}
            <div className="mobile-section-toggles">
                <button
                    className={`mobile-toggle-btn ${mobileSection === 'schedule' ? 'active' : ''}`}
                    onClick={() => toggleMobileSection('schedule')}
                >
                    📡 SCHEDULE
                </button>
                <button
                    className={`mobile-toggle-btn ${mobileSection === 'rules' ? 'active' : ''}`}
                    onClick={() => toggleMobileSection('rules')}
                >
                    📋 RULES & REGULATIONS
                </button>
            </div>

            <div className="ankur-grid">
                {/* Left Column: Schedule */}
                <div className={`ankur-card schedule-card mobile-collapsible ${mobileSection === 'schedule' ? 'mobile-open' : ''}`}>
                    <div className="card-header">
                        <h2>MISSION SCHEDULE</h2>
                        <span className="header-tag">FLIGHT_LOG.EXE</span>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline">
                            {displayedItems.map((item, index) => (
                                <div className="timeline-item" key={index}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-top">
                                            <h3>{item.title}</h3>
                                            <span className="time">{item.time}</span>
                                        </div>
                                        <div className="timeline-desc">
                                            {item.desc}
                                            <span className="tag">{item.tag}</span>
                                        </div>
                                        <div className="timeline-link">
                                            <FaPaperclip /> {item.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {scheduleItems.length > 5 && (
                        <div className="show-more-container">
                            <button
                                className="show-more-btn"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "SHOW LESS" : "SHOW MORE"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Rules */}
                <div className={`right-column mobile-collapsible ${mobileSection === 'rules' ? 'mobile-open' : ''}`}>
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
