import React, { useState } from "react";
import "../Styles/hackathon.css";
import { FaPaperclip, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";

const Hackathon = () => {
    const [showAll, setShowAll] = useState(false);

    const scheduleItems = [
        {
            title: "Registration Process",
            time: "March 16, 9:00 AM - 11:00 AM",
            desc: "Participants register, providing essential team details and project ideas.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Registration Desk",
            dotColor: "pink"
        },
        {
            title: "Inauguration Ceremony",
            time: "March 16, 11:00 AM - 11:30 AM",
            desc: "Kickstart the hackathon with engaging speeches and a formal opening.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 1",
            time: "March 16, 11:30 AM - 6:00 PM",
            desc: "Teams brainstorm and start working on their projects.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Jury Round 1",
            time: " 16, 4:00 PM - 6:00 PM",
            desc: "Showcase your progress and receive feedback from the judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Cultural Event",
            time: "March , 6:00 PM - 7:00 PM",
            desc: "Take a break and enjoy exciting performances or showcase your talent.",
            tag: "Optional",
            tagColor: "blue",
            location: "Auditorium",
            dotColor: "purple"
        },
        {
            title: "Jamming Session",
            time: "March 16, 9:00 PM - 9:15 PM",
            desc: "Sing along and enjoy the music in this creative session.",
            tag: "Optional",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Jury Round 2",
            time: "March, 10:00 PM - 12:00 AM",
            desc: "Showcase your progress and receive feedback from the judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 2",
            time: "March 17, 12:00 AM - 6:00 AM",
            desc: "The overnight coding marathon continues with focused energy.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Fun Games",
            time: "March 17, 6:00 AM - 7:00 AM",
            desc: "Relax and recharge with entertaining games.",
            tag: "Optional",
            tagColor: "blue",
            location: "Recreation Hall",
            dotColor: "purple"
        },
        {
            title: "Jury Round 3",
            time: "March , 8:00 AM",
            desc: "Present Phase 2 progress and gather final inputs from judges.",
            tag: "In Progress",
            tagColor: "blue",
            location: "Main Hall",
            dotColor: "purple"
        },
        {
            title: "Hackathon Phase 3",
            time: "March 17, 8:00 AM - 12:00 PM",
            desc: "Finalize and perfect your projects for the grand presentation.",
            tag: "In Progress",
            tagColor: "blue",
            location: "All Venues",
            dotColor: "purple"
        },
        {
            title: "Jury Round 4",
            time: ", 2:00 PM",
            desc: "Final project presentation and evaluation to decide the winners.",
            tag: "Mandatory",
            tagColor: "purple",
            location: "Main Hall",
            dotColor: "purple"
        }
    ];

    // Show first 5 items initially
    const displayedItems = showAll ? scheduleItems : scheduleItems.slice(0, 5);

    return (
        <div className="hackathon-page">
            {/* Header Section */}
            <div className="hackathon-header">
                <h1 className="main-title">सृजन</h1>
                <div className="vertical-divider"></div>
                <p className="header-desc">
                    It's a celebration of innovation, learning, and the power of collective
                    creativity. Brainstorm and build solutions overnight, have fun and win
                    amazing prizes!
                </p>
            </div>

            <div className="hackathon-grid">
                {/* Left Column: Schedule */}
                <div className="hackathon-card schedule-card">
                    <div className="card-header">
                        <h2>Schedule</h2>
                    </div>

                    <div className="timeline">
                        {displayedItems.map((item, index) => (
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

                    <div className="show-more-container">
                        <button
                            className="show-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                </div>

                {/* Right Column: CTA & Rules */}
                <div className="right-column">
                    {/* CTA Section */}
                    <div className="hackathon-cta">
                        <div className="entry-fee">
                            <FaCode color="#d46836ff" /> Entry Fee: ₹0
                        </div>
                        <h2 className="cta-title">Register now and start building.</h2>
                        <Link to="/register">
                            <img src={registerBtnImg} alt="Register Now" className="register-btn-img" />
                        </Link>
                    </div>

                    {/* Rules & Regulations */}
                    <div className="hackathon-card rules-card">
                        <div className="card-header">
                            <h2>Rules & Regulations</h2>
                        </div>

                        <ul className="rules-list">
                            <li>Participants must treat all other team members, competitors, judges, coaches, volunteers, etc., with respect and courtesy.</li>
                            <li>The complete team must be present at the venue on the first day (14/02/2025) of the event without fail or any reasons.</li>
                            <li>The complete team must be present at the venue on the second day (15/02/2025) of the event without fail or any reasons.</li>
                            <li>Team size must be a maximum of 2-4 participants.</li>
                            <li>Problem statements will be provided by INNOVO SSGMCE'25, and the description of all problem statements will be given on time.</li>
                            <li>Each team must carry a laptop and a power extension.</li>
                            <li>Each team member must carry their Aadhar card and College ID.</li>
                            <li>Accommodation will be provided by the College, and only one participant is allowed to take rest in the restrooms for 1 hour only.</li>
                            <li>Prizes will be given for the complete hackathon. There will not be any individual prizes for any theme or problem statement.</li>
                            <li>Participating teams must exclusively consist of students who are not part of any organizers, volunteers, judges, sponsors, or in another privileged position related to the event.</li>
                            <li>Hackathon will be conducted in 3 phases: Phase-I (Day-1: 11:00 AM to Day-2: 07:00 PM), Phase-II (Day-1: 9:30 PM to Day-2: 06:00 AM), Phase-III (Day-1: 07:00 AM to Day-2: 04:00 PM).</li>
                            <li>Registration time is between 9:00 AM to 11:00 AM on the first day.</li>
                            <li>All other rules will be conveyed on time.</li>
                            <li>The final decision will be taken by INNOVO SSGMCE 2025 (*Terms & Conditions apply).</li>
                        </ul>

                        <div className="download-btn-container">
                            <button className="download-btn">DOWNLOAD RULES & REGULATIONS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hackathon;
