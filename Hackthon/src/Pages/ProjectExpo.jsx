import React from "react";
import "../Styles/projectExpo.css";
import { FaPaperclip, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";

const ProjectExpo = () => {

    const scheduleItems = [
        {
            title: "Registration Process",
            time: "9:00 AM - 11:00 AM",
            desc: "Participants register and provide essential team details.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Registration Desk",
            dotColor: "pink"
        },
        {
            title: "Inauguration Ceremony & Exhibition",
            time: "11:00 AM",
            desc: "The formal inauguration ceremony for the Project Expo.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Evaluation",
            time: "1:00 PM - 4:00 PM",
            desc: "Judges evaluate projects based on various performance metrics.",
            tag: "Important",
            tagColor: "blue",
            location: "Evaluation Area",
            dotColor: "purple"
        },
        {
            title: "Valedictory",
            time: "4:00 PM - 5:30 PM",
            desc: "Winners announcement, prize distribution, and closing ceremony.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        }
    ];

    return (
        <div className="projectexpo-page">
            {/* Header Section */}
            <div className="projectexpo-header">
                <h1 className="main-title">अंकुर</h1>
                <div className="vertical-divider"></div>
                <p className="header-desc">
                    A National Level Project Expo Competition. Showcase your innovative ideas,
                    present your working models, and compete with the best minds across the nation.
                </p>
            </div>

            <div className="projectexpo-grid">
                {/* Left Column: Schedule */}
                <div className="projectexpo-card schedule-card">
                    <div className="card-header">
                        <h2>Schedule</h2>
                    </div>

                    <div className="timeline">
                        {scheduleItems.map((item, index) => (
                            <div className="timeline-item" key={index}>
                                <div className={`timeline-dot ${item.dotColor}`}></div>
                                <div className="timeline-content">
                                    <div className="timeline-top">
                                        <h3>{item.title}</h3>
                                        <span className="time">{item.time}</span>
                                    </div>
                                    <div className="timeline-desc">
                                        {item.desc}
                                        <span className={`tag ${item.tagColor}`}>{item.tag}</span>
                                    </div>
                                    <div className="timeline-link">
                                        <FaPaperclip /> {item.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: CTA & Rules */}
                <div className="right-column">
                    {/* CTA Section */}
                    <div className="projectexpo-cta">
                        <div className="entry-fee">
                            Entry Fee: ₹0
                        </div>
                        <h2 className="cta-title">Register now and Win Prizes.</h2>
                        <Link to="/register?event=ankur">
                            <img src={registerBtnImg} alt="Register Now" className="register-btn-img" />
                        </Link>
                    </div>

                    {/* Rules & Regulations */}
                    <div className="projectexpo-card rules-card">
                        <div className="card-header">
                            <h2>Project Expo Rules</h2>
                        </div>

                        <ul className="rules-list">
                            <li>Participant must treat all other team members, competitors, judges, coaches, volunteers with respect and courtesy.</li>
                            <li>Members should have a valid Student ID card of the school/college, Aadhar card.</li>
                            <li>Maximum 2 to 3 students per project will be allowed.</li>
                            <li>Participation is open to students from designated categories: Juniors (class 5th to 12th), Seniors (UG/PG).</li>
                            <li>Students need to specify the stream of their project before the Expo.</li>
                            <li>The model should be in good working condition.</li>
                            <li>Participants have to bring their power extension and other equipment as per requirement.</li>
                            <li>Five minutes will be given for each participant to present their project to the jury.</li>
                            <li>PPT presentation is NOT mandatory. Stand-up model or project should be shown.</li>
                            <li>At the time of presentation, students are requested to submit a HARD COPY of the abstract mandatorily.</li>
                            <li>The prizes will be awarded based on the presentation, viva, and model presentation.</li>
                            <li>Teams should mandatorily carry a Banner/Flex of 3*3 meters.</li>
                            <li>Final decision will be taken by judges. (*Terms & Conditions applied)</li>
                        </ul>

                        <div className="download-btn-container">
                            <button className="download-btn">Download Rules & Regulations</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectExpo;
