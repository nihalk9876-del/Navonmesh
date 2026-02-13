import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/cultural.css";
import { FaScroll, FaUserAstronaut, FaWhatsapp, FaPhoneAlt, FaStar } from "react-icons/fa";

// Assets
import e1 from "../assets/events/e1.png";
import e2 from "../assets/events/e2.png";
import e3 from "../assets/events/e3.png";
import g1 from "../assets/gallery1.png";
import g2 from "../assets/gallery2.png";
import bgVideo from "../assets/bg.mp4";
import sushantImg from "../assets/sushant_akhare.png";
import dollyImg from "../assets/dolly_bhutada.png";



const Cultural = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const eventPhotos = [e1, e2, e3, g1, g2];

    useEffect(() => {
        // Precise auto-scroll for gallery
        const autoScroll = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
                }
            }
        }, 5000);

        return () => clearInterval(autoScroll);
    }, []);

    const coordinators = [
        {
            name: "Sushant Akhare",
            role: "Cultural Head",
            phone: "+91 97631 82186",
            image: sushantImg
        },
        {
            name: "Dolly Bhutada",
            role: "Volunteer Head",
            phone: "+91 84594 72283",
            image: dollyImg
        }
    ];

    const protocolItems = [
        "Participants must initialize their status through the online portal prior to the deadline.",
        "Performance sequence and duration must strictly align with temporal mission constraints.",
        "Audio telemetry (tracks) must be submitted 24 hours prior to ignition via the data terminal.",
        "Zero tolerance for inappropriate content or actions during the celebration orbit.",
        "Mission Control's decisions regarding evaluation and sequence are final.",
        "Maintain secondary backup on physical storage nodes (Pendrives) for redundancy.",
        "Uphold the spirit of the cosmos with sportsmanship and cultural discipline."
    ];

    return (
        <div className="cultural-page">
            {/* 🌌 IMMERSIVE COSMIC BACKGROUND */}
            <div className="cultural-video-bg">
                <video autoPlay loop muted playsInline className="cosmic-video">
                    <source src={bgVideo} type="video/mp4" />
                </video>
                <div className="cosmic-overlay"></div>
            </div>



            <div className="cultural-hero-container">
                <div className="cultural-hero">
                    <div className="gallery-track" ref={scrollRef}>
                        {eventPhotos.map((img, index) => (
                            <div key={index} className="gallery-slide">
                                <img src={img} alt={`Gallery ${index}`} className="gallery-image" />
                            </div>
                        ))}
                    </div>

                    <div className="register-overlay">
                        <h1 className="cultural-main-title">उत्कर्ष '26</h1>
                        <p className="cosmic-tagline">Exploring the Galaxy of Art & Creativity</p>
                        <button
                            className="register-cultural-btn"
                            onClick={() => navigate("/cultural-register")}
                        >
                            Register for Mission
                        </button>
                    </div>
                </div>
            </div>

            <div className="cultural-content-wrapper">
                <div className="info-grid">
                    {/* Mission Protocols Panel */}
                    <div className="glass-panel">
                        <div className="panel-header">
                            <FaScroll className="panel-icon" />
                            <h3 className="panel-title">Mission Protocols</h3>
                        </div>
                        <ul className="protocol-list">
                            {protocolItems.map((item, idx) => (
                                <li key={idx} className="protocol-item">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Mission Command Hub */}
                    <div className="glass-panel">
                        <div className="panel-header">
                            <FaUserAstronaut className="panel-icon" />
                            <h3 className="panel-title">Mission Command</h3>
                        </div>
                        <div className="command-hub">
                            {coordinators.map((person, idx) => (
                                <div key={idx} className="coord-card">
                                    <div className="coord-avatar-wrapper">
                                        <img src={person.image} alt={person.name} className="coord-image" />
                                    </div>
                                    <div className="coord-details">
                                        <h4>{person.name}</h4>
                                        <p className="coord-role">{person.role}</p>
                                        <div className="coord-actions">
                                            <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="action-link">
                                                <FaPhoneAlt size={12} /> {person.phone}
                                            </a>
                                            <a
                                                href={`https://wa.me/${person.phone.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="action-link"
                                            >
                                                <FaWhatsapp className="whatsapp-icon" /> Comm
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cultural;
