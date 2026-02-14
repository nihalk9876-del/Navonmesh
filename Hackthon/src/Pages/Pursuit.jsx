import React, { useEffect } from "react";
import "../Styles/pursuit.css";
import { FaMicrochip, FaUsers, FaArrowRight } from "react-icons/fa";

// Assets
import pursuitLogo from "../assets/events/pursuit.png";
import placeholderImg from "../assets/team_placeholder.png";
import bgVideo from "../assets/bg.mp4";

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
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" // Cosmic Data/Cloud
        },
        {
            title: "Mastering LaTeX",
            subtitle: "Type Smart, Not Hard",
            desc: "Focus on the content, let LaTeX handle the beauty",
            fee: "Free",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800" // Clean code/document
        },
        {
            title: "AIML Bootcamp",
            subtitle: "Building the Future with ML",
            desc: "Turn raw data into predictive power",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" // AI/ML Neural
        },
        {
            title: "Introduction to VLSI",
            subtitle: "Designing the Silicon Future",
            desc: "The journey from logic gates to transistors",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" // Hardware/Silicon
        },
        {
            title: "Agentic AI",
            subtitle: "Mastering Agentic Workflows",
            desc: "The future of software isn’t tools, it’s agents",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" // Cyber Agentic
        },
        {
            title: "EV Workshop",
            subtitle: "Innovate & Drive",
            desc: "Master the future of mobility",
            fee: "₹150",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800" // EV Charging
        },
        {
            title: "Cybersecurity Workshop",
            subtitle: "Exploits, Encryption & Defense",
            desc: "Think like a hacker to build like an expert",
            fee: "₹50",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" // Security/Firewall
        },
        {
            title: "Web Development",
            subtitle: "Turn Ideas into Live Websites",
            desc: "Innovate the future of digital experiences",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800" // Web Matrix
        },
        {
            title: "Autodesk Revit",
            subtitle: "Model. Design. Visualize.",
            desc: "Master Building Modeling for Smart Design",
            fee: "₹100",
            image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800" // Architecture
        }
    ];

    const [activeTab, setActiveTab] = React.useState('workshops');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Optional: specific scroll logic if needed
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
            org: "CRITS (Centre of Innovation and Advance Technical Skills)",
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
        <div className="pursuit-page">
            <div className="pursuit-hero">
                <img src={pursuitLogo} alt="Pursuit Logo" style={{ width: "120px", marginBottom: "20px" }} />
                <h1 className="pursuit-title">PURSUIT</h1>
                <p className="pursuit-subtitle">Thermal-Based Technical Symposium</p>

                <div className="pursuit-info-box">
                    PURSUIT is the theme-based national level technical symposium. It is a grand stage where innovation meets competition.
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="pursuit-tabs">
                <button
                    className={`pursuit-tab-btn ${activeTab === 'workshops' ? 'active' : ''}`}
                    onClick={() => handleTabChange('workshops')}
                >
                    <FaMicrochip /> Workshops
                </button>
                <button
                    className={`pursuit-tab-btn ${activeTab === 'speakers' ? 'active' : ''}`}
                    onClick={() => handleTabChange('speakers')}
                >
                    <FaUsers /> Speakers
                </button>
            </div>

            {/* 🛠️ Specialized Workshops (Conditionally Visible) */}
            {activeTab === 'workshops' && (
                <div className="pursuit-section fade-in">
                    <h2 className="section-heading">
                        <FaMicrochip /> Mission Modules: Workshops
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
                                    <div className="img-overlay-glow"></div>
                                </div>

                                <div className="workshop-details-content">
                                    <h3 className="workshop-title">{ws.title}</h3>
                                    <h4 className="workshop-subtitle">{ws.subtitle}</h4>
                                    <p className="workshop-desc">{ws.desc}</p>
                                    <div className="workshop-cta-footer">
                                        <span>Initialize Program</span>
                                        <FaArrowRight size={12} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 🎙️ Mission Command: Speakers (Conditionally Visible) */}
            {activeTab === 'speakers' && (
                <div className="pursuit-section fade-in">
                    <div className="speakers-header-container">
                        <div className="speakers-title-badge">
                            Speakers
                        </div>
                    </div>
                    <p className="speakers-intro">
                        Meet the minds inspiring Pursuit 2026 – innovators, builders, and leaders shaping the future.
                    </p>

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

            {/* 📞 Mission Support / Queries Section */}
            <div className="pursuit-section">
                <div className="support-container">
                    <div className="support-card">
                        <div className="support-header">
                            <h2 className="support-title">Mission Support</h2>
                            <p className="support-subtitle">For any queries regarding the symposium</p>
                        </div>
                        <div className="support-contacts">
                            <div className="contact-item">
                                <span className="contact-label">Pursuit Head</span>
                                <span className="contact-name">Vedant Darokar</span>
                                <a href="tel:9307736340" className="contact-phone">9307736340</a>
                            </div>
                            <div className="contact-divider"></div>
                            <div className="contact-item">
                                <span className="contact-label">Technical Coordinator</span>
                                <span className="contact-name">Nihal Kankal</span>
                                <a href="tel:7499696317" className="contact-phone">7499696317</a>
                            </div>
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
                    Visit Pursuit Website for Registration <FaArrowRight style={{ marginLeft: "10px" }} />
                </button>
            </div>
        </div>
    );
};

export default Pursuit;
