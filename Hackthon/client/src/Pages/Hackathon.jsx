import React, { useState } from "react";
import "../Styles/hackathon.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";
import ProblemStatements from "../Components/ProblemStatements";
import srijanPoster from "../assets/HACKATHON.jpeg";

const Hackathon = () => {
    const [showAll, setShowAll] = useState(false);
    const [mobileSection, setMobileSection] = useState(null);
    const [showFilledModal, setShowFilledModal] = useState(false);

    const toggleMobileSection = (section) => {
        setMobileSection(prev => prev === section ? null : section);
    };

    const scheduleItems = [
        {
            title: "Registration & Check-in",
            time: "March 23, 7:00 AM - 1:00 PM",
            desc: "On-site registration and kit distribution (Ongoing simultaneously).",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Registration Desk",
            dotColor: "pink"
        },
        {
            title: "Inauguration & Keynotes",
            time: "March 23, 11:30 AM - 12:15 PM",
            desc: "Formal opening with chief guests and initial mission briefing.",
            tag: "Key Event",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Buffer & Final Setup",
            time: "March 23, 12:15 PM - 12:30 PM",
            desc: "Stations ready. Final technical checks and team synchronization.",
            tag: "Protocol",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Hackathon Commences",
            time: "March 23, 12:30 PM",
            desc: "The clock starts! 24 hours of continuous innovation begins.",
            tag: "Critical",
            tagColor: "blue",
            location: "Mission Control",
            dotColor: "purple"
        },
        {
            title: "Jury Round 1",
            time: "March 23, 2:30 PM - 3:30 PM",
            desc: "Initial feasibility check and architecture review for all squads.",
            tag: "Jury Round",
            tagColor: "blue",
            location: "Team Stations",
            dotColor: "purple"
        },
        {
            title: "Core Development Phase",
            time: "March 23, 3:30 PM Onwards",
            desc: "Intensive team work and feature implementation.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Cultural Kalaspandhan",
            time: "March 23, 6:00 PM - 8:00 PM",
            desc: "A brief mental recharge with evening cultural performances.",
            tag: "Refreshment",
            tagColor: "blue",
            location: "Main Stage",
            dotColor: "purple"
        },
        {
            title: "Dinner Break",
            time: "March 23, 8:00 PM - 9:00 PM",
            desc: "Evening rations served for all registered tactical units.",
            tag: "Break",
            tagColor: "blue",
            location: "Food Court",
            dotColor: "purple"
        },
        {
            title: "Overnight Work Block",
            time: "March 23, 9:00 PM - 9:00 AM",
            desc: "12 hours of uninterrupted development. Fuel up, stay alert.",
            tag: "Intensive",
            tagColor: "purple",
            location: "All Venues",
            dotColor: "pink"
        },
        {
            title: "Ongoing Breakfast",
            time: "March 24, 7:00 AM - 9:00 AM",
            desc: "Breakfast service active while the mission clock continues.",
            tag: "Support",
            tagColor: "blue",
            location: "Food Court",
            dotColor: "purple"
        },
        {
            title: "Jury Round 2",
            time: "March 24, 9:00 AM - 10:30 AM",
            desc: "Mid-way implementation review and technical hurdle assessment.",
            tag: "Jury Round",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Lunch & Rest Break",
            time: "March 24, 11:00 AM - 12:30 PM",
            desc: "Midday reset before the final development sprint.",
            tag: "Break",
            tagColor: "blue",
            location: "Food Court",
            dotColor: "purple"
        },
        {
            title: "Final Tweak & Refine",
            time: "March 24, 12:30 PM - 3:30 PM",
            desc: "Last 3 hours for debugging and presentation polishing.",
            tag: "Final Phase",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Final Jury Round (Round 3)",
            time: "March 24, 3:30 PM - 4:30 PM",
            desc: "Final defense of the project. Winners decided across all rounds.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Concludes",
            time: "March 24, 4:30 PM",
            desc: "The clock stops. All code must be pushed and finalized.",
            tag: "Success",
            tagColor: "purple",
            location: "Mission Control",
            dotColor: "pink"
        },
        {
            title: "Closing & Prize Ceremony",
            time: "March 24, 5:45 PM - 7:00 PM",
            desc: "Mission debriefing and recognition of top tactical units.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Auditorium",
            dotColor: "pink"
        }
    ];

    const displayedItems = showAll ? scheduleItems : scheduleItems.slice(0, 5);

    return (
        <div className="hackathon-page voyager-theme">
            {/* Background elements for depth */}
            <div className="voyager-grid-overlay"></div>
            <div className="voyager-vignette"></div>

            {/* Top HUD Bar */}
            <div className="voyager-hud-top">
                <div className="hud-left">COMM_LINK: ESTABLISHED [NAVONMESH_S26]</div>
                <div className="hud-center">MISSION: SRIJAN-X10</div>
                <div className="hud-right">COORD: 19.9975° N, 73.7898° E</div>
            </div>

            {/* Cinematic Hero Section */}
            <div className="hackathon-hero">
                <div className="hero-poster">
                    <div className="poster-frame">
                        <img
                            src={srijanPoster}
                            alt="Srijan Poster"
                            className="poster-img"
                        />
                        <div className="poster-tech-stats">
                            <div className="stat-line">SYSTEM_CHECK: 100%</div>
                            <div className="stat-line">UNIT_ACTIVE: ALPHA</div>
                        </div>
                    </div>
                </div>

                <div className="hero-intel">
                    <div className="intel-header">
                        <div className="mission-status-container">
                            <span className="mission-status pulse">● MISSION STATUS: ACTIVE</span>
                            <span className="mission-status-tech">SEED_LOG STATUS: EVOLVING</span>
                        </div>
                        <h1 className="hackathon-main-title">
                            <span className="hindi-title">सृजन</span>
                            <span className="english-title">(HACKATHON)</span>
                        </h1>
                        <div className="hackathon-intel-subtitle">NATIONAL LEVEL 24 HR HACKATHON</div>
                    </div>

                    <div className="intel-description-box">
                        <span className="box-label">MISSION_DESCRIPTION</span>
                        <p className="hackathon-header-desc">
                            SRIJAN 2026 is a National Level Hackathon aimed at fostering creative problem-solving, innovation, and rapid prototyping. Join the mission to develop technology-driven solutions for real-world challenges.
                        </p>
                        <div className="intel-accents">
                            <div className="accent-bar"></div>
                            <div className="accent-dots"></div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowFilledModal(true);
                            }}
                            className="register-rocket-btn animate-float"
                            style={{ cursor: 'pointer', border: 'none', appearance: 'none' }}
                        >
                            <span className="reg-text">REGISTER FOR SRIJAN</span>
                            <div className="reg-icon-circle">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <div className="rocket-exhaust"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mission Perks (Free Food & Accom) */}
            <div className="mission-perks-highlight">
                <div className="perk-box food-highlight">
                    <span className="perk-label">MISSION_RATION</span>
                    <span className="perk-title">COMPLIMENTARY FOOD</span>
                    <div className="perk-glow"></div>
                </div>
                <div className="perk-box lodging-highlight">
                    <span className="perk-label">STATION_SLEEP</span>
                    <span className="perk-title">FREE ACCOMMODATION</span>
                    <div className="perk-glow"></div>
                </div>
            </div>

            {/* Mission Specifications (HUD STYLE) */}
            <div className="mission-hud-specs">
                <div className="hud-spec-item">
                    <div className="hud-label">ENTRY_FEE</div>
                    <div className="hud-value">₹300 (PER TEAM)</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="hud-spec-item">
                    <div className="hud-label">TEAM_SIZE</div>
                    <div className="hud-value">2 - 4 UNIT</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '75%' }}></div></div>
                </div>
                <div className="hud-spec-item">
                    <div className="hud-label">ELIGIBILITY</div>
                    <div className="hud-value">UG, PG, ENG, TECH</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="hud-spec-item">
                    <div className="hud-label">REWARDS_POOL</div>
                    <div className="hud-value">₹75,000+</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '90%' }}></div></div>
                </div>
            </div>

            {/* Premium Prize Pool Section */}
            <div className="prizes-container">
                <div className="rewards-header">
                    <h2>MISSION REWARDS</h2>
                    <p className="subtitle">CREDITS ALLOCATED FOR TOP TIER OPERATIVES</p>
                </div>

                <div className="prizes-grid">
                    {[
                        {
                            title: "PROBLEM STATEMENT: STUDENT INNOVATION",
                            subtitle: "When you are registering in Student Innovation (means your own problem statement) then the problem should be related to the following domains."
                        },
                        { title: "PROBLEM STATEMENT: COMING SOON" },
                        { title: "PROBLEM STATEMENT: COMING SOON" }
                    ].map((item, index) => (
                        <div className="reward-card" key={index}>
                            <div className="reward-card-header">
                                <span className="label">TARGET_SPEC: 0{index + 1}</span>
                                <h3 className="title">{item.title}</h3>
                                {item.subtitle && <div className="card-instruction">{item.subtitle}</div>}
                            </div>
                            <div className="reward-card-body">
                                <div className="reward-tier">
                                    <span className="rank-icon">🏆</span>
                                    <div className="rank-text">
                                        <span className="rank-label">Primary Objective</span>
                                        <span className="rank-value">₹15,000</span>
                                    </div>
                                </div>
                                <div className="reward-tier">
                                    <span className="rank-icon">🥈</span>
                                    <div className="rank-text">
                                        <span className="rank-label">Secondary Objective</span>
                                        <span className="rank-value">₹11,000</span>
                                    </div>
                                </div>
                            </div>
                            <div className="reward-card-footer">
                                <div className="status-indicator">ALLOCATION: SUCCESS</div>
                                <div className="card-tech-dots">...</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mission-update-bar">
                    <span className="update-icon">🚀</span>
                    <p className="update-text">
                        <strong>MISSION UPDATE:</strong> Choose your problem statement, but it must be related to the domains shown below.
                        The prizes for all problem statements are identical.
                    </p>
                </div>

                {/* Srijan Heads Contacts - Desktop Only */}
                <div className="srijan-heads-contacts desktop-only">
                    <div className="contact-box">
                        <span className="box-title">SRIJAN HEAD</span>
                        <span className="box-name">Atharva Tayade</span>
                        <a href="tel:8767968475" className="box-phone">8767968475</a>
                    </div>
                    <div className="contact-box">
                        <span className="box-title">SRIJAN HEAD</span>
                        <span className="box-name">Nihal Kankal</span>
                        <a href="tel:8766417815" className="box-phone">8766417815</a>
                    </div>
                    <div className="contact-box">
                        <span className="box-title">SRIJAN HEAD</span>
                        <span className="box-name">Vedant Darokar</span>
                        <a href="tel:8208772402" className="box-phone">8208772402</a>
                    </div>
                    <div className="contact-box">
                        <span className="box-title">SRIJAN HEAD</span>
                        <span className="box-name">Sanchit Dangra</span>
                        <a href="tel:9876543210" className="box-phone">9876543210</a>
                    </div>
                </div>
            </div>

            {/* Problem Statements / Domains */}
            <ProblemStatements />

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

            <div className="hackathon-grid">
                {/* Left Column: Schedule */}
                <div className={`hackathon-card schedule-card mobile-collapsible ${mobileSection === 'schedule' ? 'mobile-open' : ''}`}>
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

                    <div className="show-more-container">
                        <button
                            className="show-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "SHOW LESS" : "SHOW MORE"}
                        </button>
                    </div>
                </div>

                {/* Right Column: Rules */}
                <div className={`right-column mobile-collapsible ${mobileSection === 'rules' ? 'mobile-open' : ''}`}>
                    <div className="hackathon-card rules-card">
                        <div className="card-header">
                            <h2>RULES AND REGULATIONS</h2>
                        </div>

                        <div className="rules-container">
                            <ul className="rules-list">
                                <li data-index="01">Participants must treat all other team members, competitors, judges, coaches, volunteers, etc., with respect and courtesy.</li>
                                <li data-index="02">The complete team must be present at the venue on the first day (23/03/2026).</li>
                                <li data-index="03">The complete team must be present at the venue on the second day (24/03/2026).</li>
                                <li data-index="04">Team size must be a maximum of 2-4 participants.</li>
                                <li data-index="05">Problem statements will be provided by NAVONMESH SSGMCE'26.</li>
                                <li data-index="06">Each team must carry a laptop and a power extension.</li>
                                <li data-index="07">Each team member must carry their Aadhar card and College ID.</li>
                                <li data-index="08">Accommodation will be provided for limited rest periods.</li>
                                <li data-index="09">Prizes will be given for the complete hackathon performance.</li>
                                <li data-index="10">Participating teams must exclusively consist of external students.</li>
                                <li data-index="11">Hackathon phases are strictly scheduled and monitored.</li>
                                <li data-index="12">Registration time is between 9:00 AM to 11:00 AM.</li>
                            </ul>

                            <div className="download-btn-container">
                                <button className="download-btn">DOWNLOAD ENCRYPTED PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* REGISTRATION FILLED MODAL */}
            {showFilledModal && (
                <div className="voyager-modal-overlay" onClick={() => setShowFilledModal(false)}>
                    <div className="voyager-modal-content animate-pop" onClick={e => e.stopPropagation()}>
                        <div className="modal-bracket bracket-top-left"></div>
                        <div className="modal-bracket bracket-top-right"></div>
                        <div className="modal-bracket bracket-bottom-left"></div>
                        <div className="modal-bracket bracket-bottom-right"></div>

                        <div className="modal-header">
                            <span className="status-badge">MISSION_ALERT</span>
                            <h2>REGISTRATION STATUS</h2>
                        </div>

                        <div className="modal-body">
                            <div className="error-icon-container">
                                <div className="error-circle">!</div>
                            </div>
                            <h3>REGISTRATION FILLED</h3>
                            <p>WE ARE NO LONGER ACCEPTING UNITS FOR THE <strong>SRIJAN HACKATHON</strong> MISSION. THE REQUISITE NUMBERS HAVE BEEN REACHED.</p>

                            <div className="modal-tech-stats">
                                <div className="stat-line">SYSTEM: STABLE</div>
                                <div className="stat-line">LIMIT: EXCEEDED</div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="modal-dismiss-btn" onClick={() => setShowFilledModal(false)}>
                                DISMISS PROTOCOL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hackathon;
