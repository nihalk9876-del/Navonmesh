import React, { useState } from "react";
import "../Styles/hackathon.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";
import ProblemStatements from "../Components/ProblemStatements";

const Hackathon = () => {
    const [showAll, setShowAll] = useState(false);

    const scheduleItems = [
        {
            title: "Registration Process",
            time: "March 23, 9:00 AM - 11:00 AM",
            desc: "Participants register, providing essential team details and project ideas.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Registration Desk",
            dotColor: "pink"
        },
        {
            title: "Inauguration Ceremony",
            time: "March 23, 11:00 AM - 11:30 AM",
            desc: "Kickstart the hackathon with engaging speeches and a formal opening.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 1",
            time: "March 23, 11:30 AM - 6:00 PM",
            desc: "Teams brainstorm and start working on their projects.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Jury Round 1",
            time: "March 23, 4:00 PM - 6:00 PM",
            desc: "Showcase your progress and receive feedback from the judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },

        {
            title: "Jury Round 2",
            time: "March 23, 10:00 PM - 12:00 AM",
            desc: "Showcase your progress and receive feedback from the judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 2",
            time: "March 24, 12:00 AM - 6:00 AM",
            desc: "The overnight coding marathon continues with focused energy.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Fun Games",
            time: "March 24, 6:00 AM - 7:00 AM",
            desc: "Relax and recharge with entertaining games.",
            tag: "Optional",
            tagColor: "blue",
            location: "Recreation Hall",
            dotColor: "purple"
        },
        {
            title: "Jury Round 3",
            time: "March 24, 8:00 AM",
            desc: "Present Phase 2 progress and gather final inputs from judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 3",
            time: "March 24, 8:00 AM - 12:00 PM",
            desc: "Finalize and perfect your projects for the grand presentation.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Jury Round 4",
            time: "March 24, 2:00 PM",
            desc: "Final project presentation and evaluation to decide the winners.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
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
                            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop"
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
                        <span className="mission-status pulse">MISSION STATUS: ACTIVE</span>
                        <h1 className="hackathon-main-title">सृजन (HACKATHON)</h1>
                        <div className="hackathon-intel-subtitle">NATIONAL LEVEL 24 HR HACKATHON</div>
                    </div>

                    <div className="intel-description-box">
                        <p className="hackathon-header-desc">
                            SRIJAN 2026 is a National Level Hackathon aimed at fostering creative problem-solving, innovation, and rapid prototyping. Join the mission to develop technology-driven solutions for real-world challenges.
                        </p>
                        <div className="intel-accents">
                            <div className="accent-bar"></div>
                            <div className="accent-dots"></div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <Link to="/register?event=srijan" className="hero-register-btn">
                            <span className="btn-glitch">REGISTER FOR HACKATHON</span>
                        </Link>
                    </div>
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

            {/* Prize Pool Section */}
            <div className="prizes-container">
                <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#ffd700', fontSize: '2.5rem', fontFamily: 'Orbitron' }}>MISSION REWARDS</h2>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '40px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                    Prizes allocated for each of the 3 Problem Statements
                </p>

                <div className="prizes-grid">
                    {/* Problem 1 */}
                    <div className="prize-card" style={{ textAlign: 'left', padding: '30px' }}>
                        <div className="prize-label" style={{ fontSize: '1.1rem', color: '#2dd4bf', borderBottom: '1px solid rgba(45, 212, 191, 0.2)', paddingBottom: '10px', marginBottom: '20px' }}>PROBLEM STATEMENT 01</div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🏆</span>
                            <span className="tier-rank">1st Prize</span>
                            <span className="tier-value">₹15,000</span>
                        </div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🥈</span>
                            <span className="tier-rank">2nd Prize</span>
                            <span className="tier-value">₹11,000</span>
                        </div>
                    </div>

                    {/* Problem 2 */}
                    <div className="prize-card" style={{ textAlign: 'left', padding: '30px' }}>
                        <div className="prize-label" style={{ fontSize: '1.1rem', color: '#2dd4bf', borderBottom: '1px solid rgba(45, 212, 191, 0.2)', paddingBottom: '10px', marginBottom: '20px' }}>PROBLEM STATEMENT 02</div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🏆</span>
                            <span className="tier-rank">1st Prize</span>
                            <span className="tier-value">₹15,000</span>
                        </div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🥈</span>
                            <span className="tier-rank">2nd Prize</span>
                            <span className="tier-value">₹11,000</span>
                        </div>
                    </div>

                    {/* Problem 3 */}
                    <div className="prize-card" style={{ textAlign: 'left', padding: '30px' }}>
                        <div className="prize-label" style={{ fontSize: '1.1rem', color: '#2dd4bf', borderBottom: '1px solid rgba(45, 212, 191, 0.2)', paddingBottom: '10px', marginBottom: '20px' }}>PROBLEM STATEMENT 03</div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🏆</span>
                            <span className="tier-rank">1st Prize</span>
                            <span className="tier-value">₹15,000</span>
                        </div>
                        <div className="track-prize-tier">
                            <span className="prize-icon" style={{ fontSize: '1.5rem', margin: 0 }}>🥈</span>
                            <span className="tier-rank">2nd Prize</span>
                            <span className="tier-value">₹11,000</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(45, 212, 191, 0.05)', borderRadius: '15px', border: '1px solid rgba(45, 212, 191, 0.2)', textAlign: 'center' }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                        🚀 <strong>Mission Update:</strong> Detailed technical briefs for each problem statement will be deployed soon.
                    </p>
                </div>
            </div>

            {/* Problem Statements / Domains */}
            <ProblemStatements />

            <div className="hackathon-grid">
                {/* Left Column: Schedule */}
                <div className="hackathon-card schedule-card">
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
                            {showAll ? "STOP_DATA_STREAM" : "INITIALIZE_DATA_STREAM"}
                        </button>
                    </div>
                </div>

                {/* Right Column: Rules */}
                <div className="right-column">
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
        </div>
    );
};

export default Hackathon;
