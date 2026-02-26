import React, { useEffect } from "react";
import "../Styles/pursuit.css";
import { FaMicrochip, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import registerBtnImg from "../assets/register-btn.png";

// Assets
import pursuitLogo from "../assets/events/pursuit.png";
import pursuitPoster from "../assets/PURSUIT POSTER.jpeg";

// Speaker Images
import yogeshImg from "../assets/yogesh.jpg";
import nakulImg from "../assets/nakul.png";
import amitImg from "../assets/amit.jpg";
import riyaImg from "../assets/riya.jpg";
import pranavImg from "../assets/pranav.jpg";
import chetanImg from "../assets/chetan.png";
import mahamuneImg from "../assets/mahamune.jpg";


const Pursuit = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const workshops = [
        {
            title: "Cloud Byte",
            subtitle: "Master Cloud and Linux",
            desc: "Hands-on workshop on Infrastructure & Deployment",
            fee: "₹49",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Mastering LaTeX",
            subtitle: "Type Smart, Not Hard",
            desc: "Focus on the content, let LaTeX handle the beauty",
            fee: "Free",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "AIML Bootcamp",
            subtitle: "Building the Future with ML",
            desc: "Turn raw data into predictive power",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Introduction to VLSI",
            subtitle: "Designing the Silicon Future",
            desc: "The journey from logic gates to transistors",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Agentic AI",
            subtitle: "Mastering Agentic Workflows",
            desc: "The future of software isn’t tools, it’s agents",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "EV Workshop",
            subtitle: "Innovate & Drive",
            desc: "Master the future of mobility",
            fee: "₹150",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Cybersecurity",
            subtitle: "Exploits & Defense",
            desc: "Think like a hacker to build like an expert",
            fee: "₹50",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Web Development",
            subtitle: "Idea to Live Website",
            desc: "Innovate the future of digital experiences",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Autodesk Revit",
            subtitle: "Model. Design. Visualize.",
            desc: "Master Building Modeling for Smart Design",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const [activeTab, setActiveTab] = React.useState('workshops');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const speakers = [
        {
            name: "Mr. Yogesh P Murumkar",
            role: "CEO & Corporate Trainer",
            org: "Bharat Software Solutions",
            image: yogeshImg
        },
        {
            name: "Mr. Nakul Deshmukh",
            role: "Founder & CEO",
            org: "Electrosoft LLP",
            image: nakulImg
        },
        {
            name: "Mr. Amit Molke",
            role: "SDR Associate",
            org: "Briskcone",
            image: amitImg
        },
        {
            name: "Miss Riya Dangra",
            role: "Software Engineer",
            org: "Apexon",
            image: riyaImg
        },
        {
            name: "Mr. Pranav Khedkar",
            role: "Alumni",
            org: "SSGMCE",
            image: pranavImg
        },
        {
            name: "Mr. Chetan Tajane",
            role: "Founder",
            org: "CRITS Innovation",
            image: chetanImg
        },
        {
            name: "Dr. R.S. Mahamune",
            role: "Faculty",
            org: "SSGMCE",
            image: mahamuneImg
        }
    ];


    return (
        <div className="pursuit-page pursuit-voyager-theme">
            {/* Background elements for depth */}
            <div className="voyager-grid-overlay"></div>
            <div className="voyager-vignette"></div>

            {/* Cinematic Hero Section */}
            <div className="pursuit-hero-section">
                <div className="hero-poster">
                    <div className="poster-frame">
                        <img
                            src={pursuitPoster}
                            alt="Pursuit Poster"
                            className="poster-img"
                        />
                        <div className="poster-tech-stats">
                            <div className="stat-line">MOD_LOAD: [9/9]</div>
                            <div className="stat-line">INTEL_NODE: PURSUIT</div>
                        </div>
                    </div>
                </div>

                <div className="pursuit-intel">
                    <div className="intel-header">
                        <div className="mission-status-container">
                            <span className="mission-status pulse">● MISSION STATUS: ENERGIZED</span>
                            <span className="mission-status-tech">CORE_DRIVE STATUS: ONLINE</span>
                        </div>
                        <h1 className="pursuit-main-title">PURSUIT</h1>
                        <div className="pursuit-intel-subtitle">NATIONAL LEVEL TECHNICAL SYMPOSIUM</div>
                    </div>

                    <div className="intel-description-box">
                        <span className="box-label">MISSION_DESCRIPTION</span>
                        <p className="pursuit-header-desc">
                            PURSUIT is a theme-based national level technical symposium. It is a grand stage where innovation meets competition, bridging the gap between theoretical knowledge and real-world engineering excellence.
                        </p>
                        <div className="intel-accents">
                            <div className="accent-bar"></div>
                            <div className="accent-dots"></div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <a href="https://www.pursuitssgmce.com" target="_blank" rel="noopener noreferrer" className="register-rocket-btn animate-float">
                            <span className="reg-text">VISIT PURSUIT WEBSITE</span>
                            <div className="reg-icon-circle">
                                <FaArrowRight />
                            </div>
                            <div className="rocket-exhaust"></div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mission Specifications (HUD STYLE) */}
            <div className="pursuit-hud-specs">
                <div className="pursuit-spec-item">
                    <div className="hud-label">ENTRY_FEE</div>
                    <div className="hud-value">₹49 - ₹150</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="pursuit-spec-item">
                    <div className="hud-label">TEAM_SIZE</div>
                    <div className="hud-value">1 - 4 UNIT</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '75%' }}></div></div>
                </div>
                <div className="pursuit-spec-item">
                    <div className="hud-label">ELIGIBILITY</div>
                    <div className="hud-value">ALL UG & PG</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="pursuit-spec-item">
                    <div className="hud-label">SESSIONS</div>
                    <div className="hud-value">9 MODULES</div>
                    <div className="hud-bar"><div className="fill" style={{ width: '90%' }}></div></div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="pursuit-tabs">
                <button
                    className={`pursuit-tab-btn ${activeTab === 'workshops' ? 'active' : ''}`}
                    onClick={() => handleTabChange('workshops')}
                >
                    <FaMicrochip /> MISSION MODULES
                </button>
                <button
                    className={`pursuit-tab-btn ${activeTab === 'speakers' ? 'active' : ''}`}
                    onClick={() => handleTabChange('speakers')}
                >
                    <FaUsers /> COMMANDERS
                </button>
            </div>

            {/* 🛠️ Specialized Workshops */}
            {activeTab === 'workshops' && (
                <div className="pursuit-section fade-in">
                    <h2 className="section-heading">
                        <FaMicrochip /> WORKSHOP STREAM
                    </h2>
                    <div className="workshops-container">
                        {workshops.map((ws, i) => (
                            <div
                                key={i}
                                className="workshop-item"
                                onClick={() => window.open("https://www.pursuitssgmce.com", "_blank")}
                            >
                                <div className="workshop-img-box">
                                    <img src={ws.image} alt={ws.title} className="workshop-card-img" />
                                    <div className="workshop-fee-badge">{ws.fee}</div>
                                </div>

                                <div className="workshop-details-content">
                                    <h3 className="workshop-title">{ws.title}</h3>
                                    <h4 className="workshop-subtitle">{ws.subtitle}</h4>
                                    <p className="workshop-desc">{ws.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 🎙️ Speakers */}
            {activeTab === 'speakers' && (
                <div className="pursuit-section fade-in">
                    <h2 className="section-heading">
                        <FaUsers /> GUEST COMMANDERS
                    </h2>
                    <div className="speakers-grid">
                        {speakers.map((speaker, idx) => (
                            <div key={idx} className="speaker-card">
                                <div className="speaker-img-wrapper">
                                    <img src={speaker.image} alt={speaker.name} className="speaker-img" />
                                </div>
                                <h3 className="speaker-name">{speaker.name}</h3>
                                <p className="speaker-role">{speaker.role}</p>
                                <p className="speaker-org">{speaker.org}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 📞 Mission Support Section */}
            <div className="pursuit-section">
                <div className="support-card">
                    <h2 className="support-title">MISSION SUPPORT</h2>
                    <p className="support-subtitle">Strategic assistance for symposium deployment</p>
                    <div className="support-contacts">
                        <div className="contact-item">
                            <span className="contact-label">Pursuit Head</span>
                            <span className="contact-name">Vedant Darokar</span>
                            <a href="tel:9307736340" className="contact-phone">9307736340</a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Technical Coordinator</span>
                            <span className="contact-name">Nihal Kankal</span>
                            <a href="tel:7499696317" className="contact-phone">7499696317</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="pursuit-cta-container">
                <button
                    className="pursuit-visit-btn"
                    onClick={() => window.open("https://www.pursuitssgmce.com", "_blank")}
                >
                    ACCESS PURSUIT MAINFRAME <FaArrowRight style={{ marginLeft: "10px" }} />
                </button>
            </div>
        </div>
    );
};

export default Pursuit;
