import React, { useState } from "react";
import "../Styles/problemStatements.css";
import { FaCity, FaBuilding, FaMicrochip, FaTimes } from "react-icons/fa";

const problems = [
    {
        id: 1,
        title: "Smart City",
        icon: <FaCity />,
        desc: "Coming Soon...",
        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop",
        details: {
            objective: "Develop intelligent solutions for urban infrastructure, traffic management, and public safety.",
            deliverables: "Prototype of the smart system, Architecture diagram, and Feasibility report.",
            evaluation: "Impact (30%), Feasibility (30%), Innovation (20%), Presentation (20%).",
            constraints: "Must use open-source data. Solution must be scalable."
        }
    },
    {
        id: 2,
        title: "Real Estate",
        icon: <FaBuilding />,
        desc: "Coming Soon...",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Innovate in property management using AI and automation.",
            deliverables: "Working web/mobile app, Valuation algorithm model.",
            evaluation: "User Experience (30%), Accuracy (30%), Tech Stack (20%), Business Model (20%).",
            constraints: "Data privacy regulations must be followed (GDPR/DPDP)."
        }
    },
    {
        id: 3,
        title: "FinTech",
        icon: <FaMicrochip />,
        desc: "Coming Soon...",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        details: {
            objective: "Revolutionize financial services with blockchain or fraud detection systems.",
            deliverables: "Secure payment gateway/ledger prototype, Security audit report.",
            evaluation: "Security (40%), Efficiency (30%), Innovation (20%), Usability (10%).",
            constraints: "Must adhere to RBI financial guidelines sandbox."
        }
    }
];

const ProblemStatements = () => {
    const [activeProblem, setActiveProblem] = useState(null);

    return (
        <div className="problem-statements-section" style={{ padding: "40px", color: "white" }}>
            <h2 style={{ fontFamily: "Orbitron", textAlign: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
                Problem Statements
            </h2>
            <div className="problem-statements-container">
                {problems.map((item) => (
                    <div
                        key={item.id}
                        className="problem-card"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        <div className="card-overlay"></div>
                        <div className="card-content">
                            <span className="card-icon">{item.icon}</span>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-desc">{item.desc}</p>
                            <button
                                className="view-desc-btn"
                                onClick={() => setActiveProblem(item)}
                            >
                                View Description
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
