import React from "react";
import "../Styles/projectExpo.css";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectExpo = () => {

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
                            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
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
                        <span className="mission-status pulse">EVENT STATUS: LIVE</span>
                        <h1 className="ankur-main-title">अंकुर (PROJECT COMPETITION)</h1>
                        <div className="ankur-intel-subtitle">NATIONAL LEVEL PROJECT COMPETITION</div>
                    </div>

                    <p className="ankur-header-desc">
                        ANKUR is a National Level Project Competition showcasing innovation in societal, industrial, and technological domains. Bridge the gap between academic theory and real-world impact.
                    </p>

                    <div className="header-actions">
                        <Link to="/register?event=ankur" className="ankur-register-btn">
                            REGISTER FOR PROJECT COMPETITION
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
                <div className="ankur-spec-item">
                    <div className="hud-label">PRIZE_RECOGNITION</div>
                    <div className="hud-value">CASH AWARDS</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '85%' }}></div></div>
                </div>
            </div>

            <div className="ankur-grid">
                {/* Left Column: Schedule */}
                <div className="ankur-card schedule-card">
                    <div className="card-header">
                        <h2>MISSION SCHEDULE</h2>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline">
                            {scheduleItems.map((item, index) => (
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
                </div>

                {/* Right Column: Rules */}
                <div className="right-column">
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
