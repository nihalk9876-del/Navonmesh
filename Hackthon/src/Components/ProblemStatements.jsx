import React, { useState } from "react";
import "../Styles/problemStatements.css";
import { FaLeaf, FaBrain, FaBolt, FaHeartbeat, FaTractor, FaIndustry, FaTimes } from "react-icons/fa";

const problems = [
    {
        id: 1,
        title: "Smart & Sustainable Technologies",
        icon: <FaLeaf />,
        desc: "Innovating for a greener, smarter future.",
        img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Create solutions that integrate smart technology with sustainability.",
            deliverables: "Working prototypes, conceptual models, and impact analysis.",
            evaluation: "Innovation, Sustainability Impact, Technical Feasibility.",
            constraints: "Must focus on environmental sustainability."
        }
    },
    {
        id: 2,
        title: "AI, ML, & Cyber Security",
        icon: <FaBrain />,
        desc: "Harnessing the power of intelligence and data security.",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
        details: {
            objective: "Develop AI/ML models or cybersecurity solutions for real-world problems.",
            deliverables: "Codebase, Model Performance Metrics, Security Assessment.",
            evaluation: "Accuracy, Efficiency, Security Robustness.",
            constraints: "Data privacy regulations must be followed."
        }
    },
    {
        id: 3,
        title: "Renewable Energy & EVs",
        icon: <FaBolt />,
        desc: "Powering the future with clean energy.",
        img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Innovate in renewable energy sources or electric vehicle technologies.",
            deliverables: "Prototype, Simulation results, Energy efficiency analysis.",
            evaluation: "Efficiency improvement, Cost-effectiveness, Scalability.",
            constraints: "Must be energy efficient and eco-friendly."
        }
    },
    {
        id: 4,
        title: "Healthcare Technologies",
        icon: <FaHeartbeat />,
        desc: "Revolutionizing healthcare with technology.",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Create tech solutions to improve healthcare delivery and patient outcomes.",
            deliverables: "App/Device prototype, Clinical relevance report.",
            evaluation: "Impact on patient care, Usability, Innovation.",
            constraints: "Must adhere to health data privacy standards."
        }
    },
    {
        id: 5,
        title: "Rural & Agricultural",
        icon: <FaTractor />,
        desc: "Empowering rural India with tech.",
        img: "https://images.unsplash.com/photo-1625246333195-551291d2937e?q=80&w=1931&auto=format&fit=crop",
        details: {
            objective: "Solve challenges in agriculture and rural development.",
            deliverables: "Functional prototype, Field application plan.",
            evaluation: "Social Impact, Feasibility, Cost-effectiveness.",
            constraints: "Solutions must be affordable and accessible."
        }
    },
    {
        id: 6,
        title: "Industry 4.0 & Automation",
        icon: <FaIndustry />,
        desc: "Automating the future of industry.",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Implement automation and data exchange in manufacturing technologies.",
            deliverables: "Automation script/bot, Process optimization plan.",
            evaluation: "Efficiency gain, Reliability, Innovation.",
            constraints: "Must be applicable to industrial settings."
        }
    }
];

const ProblemStatements = () => {
    const [activeProblem, setActiveProblem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="problem-statements-section" style={{ padding: "40px", color: "white" }}>
            <h2 style={{ fontFamily: "Orbitron", textAlign: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
                Domains
            </h2>

            {isMobile ? (
                <div className="mobile-domains-hub">
                    <div className="hub-scanner"></div>
                    <div className="mobile-domains-grid">
                        {problems.map((item) => (
                            <div key={item.id} className="mini-hex-card" onClick={() => setActiveProblem(item)}>
                                <div className="mini-hex-glow"></div>
                                <div className="mini-hex-content">
                                    <span className="mini-icon">{item.icon}</span>
                                    <span className="mini-title">{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="problem-statements-container">
                    {problems.map((item) => (
                        <div
                            key={item.id}
                            className="problem-card"
                            onClick={() => setActiveProblem(item)}
                        >
                            <div className="card-overlay"></div>
                            <div className="card-content">
                                <span className="card-icon">{item.icon}</span>
                                <h3 className="card-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            {activeProblem && (
                <div className="problem-modal-overlay">
                    <div className="problem-modal">
                        <button className="modal-close" onClick={() => setActiveProblem(null)}>
                            <FaTimes />
                        </button>
                        <h2 className="modal-title">{activeProblem.title}</h2>

                        <div className="modal-section">
                            <h4>Objective</h4>
                            <p>{activeProblem.details.objective}</p>
                        </div>
                        <div className="modal-section">
                            <h4>Hackathon Deliverables</h4>
                            <p>{activeProblem.details.deliverables}</p>
                        </div>
                        <div className="modal-section">
                            <h4>Evaluation Criteria</h4>
                            <p>{activeProblem.details.evaluation}</p>
                        </div>
                        <div className="modal-section">
                            <h4>Constraints</h4>
                            <p>{activeProblem.details.constraints}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProblemStatements;
