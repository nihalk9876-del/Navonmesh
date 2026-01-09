import React from "react";
import "../Styles/problem-statement.css";

const ProblemStatement = () => {
    const problems = [
        {
            title: "Smart Education System",
            description: "Develop a platform that personalizes learning experiences for students using AI, adapting to their pace and learning style.",
            domain: "Education",
            tech: "AI/ML"
        },
        {
            title: "Sustainable Agriculture",
            description: "Create an IoT-based solution to monitor soil health and optimize water usage for farmers in arid regions.",
            domain: "Agriculture",
            tech: "IoT"
        },
        {
            title: "Healthcare Accessibility",
            description: "Build a telemedicine app that connects rural patients with specialist doctors, ensuring low-bandwidth compatibility.",
            domain: "Healthcare",
            tech: "App Dev"
        },
        {
            title: "Disaster Management",
            description: "Design a real-time alert system for natural disasters that aggregates data from various sources to predict and warn communities.",
            domain: "Safety",
            tech: "Big Data"
        },
        {
            title: "Fintech for All",
            description: "Innovate a solution to simplify digital payments for the elderly and differently-abled population.",
            domain: "Fintech",
            tech: "Blockchain"
        },
        {
            title: "Green Energy Manager",
            description: "Develop a system for households to manage and trade excess solar energy with their neighbors.",
            domain: "Energy",
            tech: "Web Dev"
        }
    ];

    return (
        <div className="problem-statement-page">
            <div className="problem-header">
                <h1 className="main-title">समस्या</h1>
                <div className="vertical-divider"></div>
                <p className="header-desc">
                    Identify the gaps, innovate the solutions. Explore the problem statements
                    that challenge your creativity and technical prowess.
                </p>
            </div>

            <div className="problem-grid">
                {problems.map((problem, index) => (
                    <div className="problem-card" key={index}>
                        <div className="card-header">
                            <h2>{problem.title}</h2>
                        </div>
                        <p className="problem-desc">{problem.description}</p>
                        <div className="problem-tags">
                            <span className="tag domain">{problem.domain}</span>
                            <span className="tag tech">{problem.tech}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemStatement;
