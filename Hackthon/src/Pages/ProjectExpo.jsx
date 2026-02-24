import React from "react";
import "../Styles/projectExpo.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import ankurPoster from "../assets/PROJECT COMPETITION.png";

const ProjectExpo = () => {
    const [mobileSection, setMobileSection] = React.useState(null);

    const toggleMobileSection = (section) => {
        setMobileSection(prev => prev === section ? null : section);
    };

    const scheduleItems = [
        {
            title: "Registration Process",
            time: "9:00 AM - 11:00 AM",
            desc: "Participants register and provide essential team details.",
            tag: "Mandatory",
            location: "Registration Desk"
        },
        {
            title: "Inauguration Ceremony & Exhibition",
            time: "11:00 AM",
            desc: "The formal inauguration ceremony for the Project Expo.",
            tag: "Key Event",
            location: "Main Hall"
        },
        {
            title: "Evaluation",
            time: "1:00 PM - 4:00 PM",
            desc: "Judges evaluate projects based on various performance metrics.",
            tag: "Important",
            location: "Evaluation Area"
        },
        {
            title: "Valedictory",
            time: "4:00 PM - 5:30 PM",
            desc: "Winners announcement, prize distribution, and closing ceremony.",
            tag: "Mandatory",
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
                            src={ankurPoster}
                            alt="Ankur Poster"
                            className="poster-img"
                        />
                        <div className="poster-tech-stats">
                            <div className="stat-line">EXPO_SCAN: ACTIVE</div>
                            <div className="stat-line">CORE_SYNC: 98%</div>
                        </div>
                    </div>
                </div>

                <div className="ankur-intel">
                    <div className="intel-header">
                        <div className="mission-status-container">
                            <span className="mission-status pulse">● MISSION STATUS: NOMINAL</span>
                            <span className="mission-status-tech">DATA_FLOW STATUS: SYNCED</span>
                        </div>
                        <h1 className="ankur-main-title">
                            <span className="hindi-title">अंकुर</span>
                            <span className="english-title">(PROJECT COMPETITION)</span>
                        </h1>
                        <div className="ankur-intel-subtitle">NATIONAL LEVEL PROJECT COMPETITION</div>
                    </div>

                    <div className="intel-description-box">
                        <span className="box-label">MISSION_DESCRIPTION</span>
                        <p className="ankur-header-desc">
                            ANKUR is a National Level Project Competition showcasing innovation in societal, industrial, and technological domains. Bridge the gap between academic theory and real-world impact.
                        </p>
                        <div className="intel-accents">
                            <div className="accent-bar"></div>
                            <div className="accent-dots"></div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <Link to="/register?event=ankur" className="register-rocket-btn animate-float">
                            <span className="reg-text">REGISTER FOR ANKUR</span>
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
                    <div className="hud-value">2 - 3 UNIT</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '75%' }}></div></div>
                </div>
                <div className="ankur-spec-item">
                    <div className="hud-label">ELIGIBILITY</div>
                    <div className="hud-value">UG & PG STUDENTS</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
            </div>

            {/* Premium Prize Pool Section */}
            <div className="prizes-container">
                <div className="rewards-header">
                    <h2>MISSION REWARDS</h2>
                    <p className="subtitle">CREDITS ALLOCATED FOR TOP TIER OPERATIVES</p>
                </div>

                <div className="prizes-grid single-card-grid">
                    <div className="reward-card ankur-prize-card">
                        <div className="reward-card-header">
                            <span className="label">TARGET_SPEC: OVERALL_EXCELLENCE</span>
                            <h3 className="title">BEST PROJECT RECOGNITION</h3>
                        </div>
                        <div className="reward-card-body">
                            <div className="reward-tier">
                                <span className="rank-icon">🏆</span>
                                <div className="rank-text">
                                    <span className="rank-label">Primary Objective (1st Prize)</span>
                                    <span className="rank-value">₹11,000</span>
                                </div>
                            </div>
                            <div className="reward-tier">
                                <span className="rank-icon">🥈</span>
                                <div className="rank-text">
                                    <span className="rank-label">Secondary Objective (2nd Prize)</span>
                                    <span className="rank-value">₹7,000</span>
                                </div>
                            </div>
                        </div>
                        <div className="reward-card-footer">
                            <div className="status-indicator">ALLOCATION: SUCCESS</div>
                            <div className="card-tech-dots">...</div>
                        </div>
                    </div>
                </div>

                <div className="mission-update-bar">
                    <span className="update-icon">🚀</span>
                    <p className="update-text">
                        <strong>MISSION UPDATE:</strong> Evaluation matrix is being finalized. Best project recognition protocols are currently active.
                    </p>
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
                                <li data-index="01">Participant must treat all other team members, competitors, judges, coaches, volunteers with respect.</li>
                                <li data-index="02">Members should have a valid Student ID card of the school/college, Aadhar card.</li>
                                <li data-index="03">Maximum 2 to 3 students per project will be allowed.</li>
                                <li data-index="04">Participation is open to students from designated categories: Seniors (UG/PG).</li>
                                <li data-index="05">Students need to specify the stream of their project before the Expo.</li>
                                <li data-index="06">The model should be in good working condition.</li>
                                <li data-index="07">Participants have to bring their power extension and other necessary equipment.</li>
                                <li data-index="08">Five minutes will be given for each participant to present their project to the jury.</li>
                                <li data-index="09">PPT presentation is optional. Physical model demonstration is preferred.</li>
                                <li data-index="10">Submit a hard copy of the abstract mandatorily during presentation.</li>
                                <li data-index="11">Teams should mandatorily carry a Banner/Flex of 3*3 meters.</li>
                            </ul>

                            <button className="ankur-download-btn">DOWNLOAD MISSION BRIEF</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectExpo;
