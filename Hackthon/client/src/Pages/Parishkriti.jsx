import React, { useState, useEffect } from "react";
import { FaLeaf, FaRobot, FaTractor, FaSatellite, FaSeedling, FaCloudSunRain, FaWater, FaChartLine, FaBoxOpen, FaArrowLeft } from "react-icons/fa";
import "../Styles/parishkriti.css";
import parishkritiLogo from "../assets/events/parishkriti.png";
import parishkritiBg from "../assets/events/parishkriti_bg.mp4";

const subEvents = [
    {
        id: 1,
        title: "Agri-Botics Challenge",
        icon: <FaRobot />,
        desc: "Design and deploy autonomous robotics capable of executing farming operations like planting, harvesting, or weeding.",
        details: "Teams must present a fully functional or heavily simulated robotic prototype that focuses on reducing human labor in intense agricultural environments.",
        gformUrl: "https://forms.google.com" // Placeholder for their own specific GForm
    },
    {
        id: 2,
        title: "Smart Irrigation Systems",
        icon: <FaWater />,
        desc: "Develop IoT-based automated water management systems that optimize water usage based on soil moisture and weather data.",
        details: "This event tests your ability to create a sensor-driven network that seamlessly integrates weather APIs and soil sensors to deploy water only when necessary.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 3,
        title: "Precision Farming Models",
        icon: <FaChartLine />,
        desc: "Use machine learning and data analytics to predict optimal planting seasons and crop selections.",
        details: "Participants will be provided with datasets containing historical weather, soil, and yield data. The goal is to build an algorithm predicting the highest yield crop.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 4,
        title: "Agri-Drone Surveyors",
        icon: <FaSatellite />,
        desc: "Build or program drones for aerial surveillance, crop health monitoring, and targeted pesticide delivery.",
        details: "Focuses on utilizing UAVs (Unmanned Aerial Vehicles) equipped with multi-spectral cameras to identify crop diseases before they spread.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 5,
        title: "Sustainable Cultivation",
        icon: <FaSeedling />,
        desc: "Innovative organic farming methods, vertical farming layouts, and hydroponics setups.",
        details: "Present physical or detailed 3D layouts of sustainable setups (like aquaponics or vertical towers) that maximize yield per square foot.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 6,
        title: "Climate Tech AI",
        icon: <FaCloudSunRain />,
        desc: "AI solutions capable of predicting hyper-local climate events to protect fields from sudden frost or storms.",
        details: "Develop a forecasting model or an alert dissemination system that rapidly warns farmers of critical impending weather shifts.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 7,
        title: "Mechanization Design",
        icon: <FaTractor />,
        desc: "Mechanical CAD designs for affordable, low-maintenance farming tools tailored for small-scale farmers.",
        details: "Bring your best CAD designs and material analyses for low-cost tools like manual seeders, improved plows, or thresher attachments.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 8,
        title: "Post-Harvest Tech",
        icon: <FaBoxOpen />,
        desc: "Solutions preventing food spoilage including cold-storage monitoring, supply-chain logistics, and packaging.",
        details: "Address the massive loss of crops post-harvest by designing smarter transport logistics or low-energy storage innovations.",
        gformUrl: "https://forms.google.com"
    },
    {
        id: 9,
        title: "Eco-Fertilizers",
        icon: <FaLeaf />,
        desc: "Biotechnology and chemical engineering models for zero-harm, high-efficiency organic fertilizers.",
        details: "Showcase your formula or production method for natural bio-fertilizers that restore soil microbiomes instead of depleting them.",
        gformUrl: "https://forms.google.com"
    }
];

const galleryImages = [
    "https://images.unsplash.com/photo-1628183236024-521b33cecfed?auto=format&fit=crop&q=80&w=800", // Tractor/Tech
    "https://images.unsplash.com/photo-1595841696650-659af3eb0f6e?auto=format&fit=crop&q=80&w=800", // Drone spraying
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800", // Greenery/Field
    "https://images.unsplash.com/photo-1586771107445-d3af07da8b3b?auto=format&fit=crop&q=80&w=800", // Greenhouse
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800", // AgTech
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"  // Seedlings
];

const Parishkriti = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        // Scroll to top when loading page or changing selected event
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [selectedEvent]);

    // If a sub-event is selected, render the detail view
    if (selectedEvent) {
        return (
            <div className="parishkriti-container detail-mode">
                {/* Animated Video Background for Agritech Vibe */}
                <div className="agri-bg-overlay">
                    <video autoPlay loop muted playsInline className="parishkriti-video-bg">
                        <source src={parishkritiBg} type="video/mp4" />
                    </video>
                    <div className="video-tint"></div>
                </div>

                <div className="p-detail-content">
                    <button className="p-back-btn" onClick={() => setSelectedEvent(null)}>
                        <FaArrowLeft /> BACK TO EVENTS
                    </button>

                    <div className="p-detail-card">
                        <div className="p-detail-icon">{selectedEvent.icon}</div>
                        <h1 className="p-detail-title">{selectedEvent.title}</h1>

                        <div className="p-detail-body">
                            <h3 className="section-head">Mission Objective</h3>
                            <p className="p-desc">{selectedEvent.desc}</p>

                            <h3 className="section-head">Event Details</h3>
                            <p className="p-details">{selectedEvent.details}</p>
                        </div>

                        <div className="p-action-section">
                            <a
                                href={selectedEvent.gformUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-register-btn"
                            >
                                REGISTER NOW (Google Form)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render the main showcase grid
    return (
        <div className="parishkriti-container grid-mode">
            <div className="agri-bg-overlay">
                <video autoPlay loop muted playsInline className="parishkriti-video-bg">
                    <source src={parishkritiBg} type="video/mp4" />
                </video>
                <div className="video-tint"></div>
            </div>

            <div className="p-header">
                <img src={parishkritiLogo} alt="Parishkriti Logo" className="p-logo" />
                <h1 className="p-main-title">PARISHKRITI</h1>
                <p className="p-intro">
                    Welcome to Navonmesh's premier Agricultural Technology summit.
                    Parishkriti merges root-level farming challenges with bleeding-edge technology.
                    Select from our 9 specialized tracks below to explore the future of Agritech.
                </p>
            </div>

            <div className="p-grid">
                {subEvents.map((ev) => (
                    <div
                        key={ev.id}
                        className="p-grid-card"
                        onClick={() => setSelectedEvent(ev)}
                    >
                        <div className="p-card-icon">{ev.icon}</div>
                        <h3 className="p-card-title">{ev.title}</h3>
                        <p className="p-card-desc">{ev.desc}</p>
                        <div className="p-card-footer">
                            <span>EXPLORE</span> →
                        </div>
                    </div>
                ))}
            </div>

            {/* NEW GALLERY SECTION FOR PARISHKRITI */}
            <div className="p-gallery-section">
                <div className="p-gallery-header">
                    <h2><FaLeaf className="gallery-header-icon" /> FIELD VISUALS & PROTOTYPES</h2>
                    <p>Exploring past innovations and agricultural tech displays</p>
                </div>

                <div className="p-gallery-grid">
                    {galleryImages.map((src, idx) => (
                        <div key={idx} className="p-gallery-item">
                            <img src={src} alt={`Agricultural Tech ${idx}`} loading="lazy" />
                            <div className="p-gallery-overlay">
                                <FaSeedling className="p-gallery-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Parishkriti;
