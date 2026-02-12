import React from 'react';
import { FaMapMarkedAlt, FaIdCard, FaLaptopCode, FaPlug, FaBed, FaUsers } from 'react-icons/fa';
import '../Styles/eventJourney.css';

const EventJourney = () => {
    const steps = [
        {
            id: 1,
            title: "Entering the College",
            icon: <FaIdCard />,
            description: "Show your ID to the college gate security and inform them about the Navonmesh event. They will guide you in towards the innovation hub.",
            location: "College Gate"
        },
        {
            id: 2,
            title: "Campus Map & Directions",
            icon: <FaMapMarkedAlt />,
            description: "Navigate through the campus. Locate the Gymnasium Hall using the map near the gate or the digital map on our website.",
            location: "Near Gate"
        },
        {
            id: 3,
            title: "Registration at Gymnasium",
            icon: <FaUsers />,
            description: "Proceed to the Registration Desk. Verify your team details with your college ID. Receive your participant kit and desk assignment.",
            location: "Gymnasium Hall"
        },
        {
            id: 4,
            title: "Workspace Setup",
            icon: <FaLaptopCode />,
            description: "Get settled at your assigned desk. We provide LAN (Ethernet) and power. Remember to bring your own extension boards for your team's gadgets.",
            location: "Assigned Desk"
        },
        {
            id: 5,
            title: "Inauguration & Instructions",
            icon: <FaPlug />,
            description: "Attend the grand inauguration. Listen carefully to the hackathon rules and connect with your assigned coordinator for any help.",
            location: "Main Stage area"
        },
        {
            id: 6,
            title: "Accommodation Check-in",
            icon: <FaBed />,
            description: "Head to the Accommodation Desk to claim your stay. Ensure you have pre-registered on the website. Rest and recharge for the coding marathon.",
            location: "Accommodation Desk"
        }
    ];

    return (
        <div className="journey-container">
            <h1 style={{
                textAlign: "center",
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(to right, #00f3ff, #ff00cc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "60px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontSize: "3rem",
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
            }}>
                Event Trajectory
            </h1>

            <div className="timeline">
                {steps.map((step, index) => (
                    <div key={step.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-content">
                            <span className="step-number">{step.id}</span>
                            <div className="icon-box">
                                {step.icon}
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <span className="step-location">📍 {step.location}</span>
                            <p className="step-desc">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative background star elements if needed beyond CSS */}
        </div>
    );
};

export default EventJourney;
