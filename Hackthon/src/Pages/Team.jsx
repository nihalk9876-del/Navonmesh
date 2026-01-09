import React from "react";
import "../Styles/team.css";
import { FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamPlaceholder from "../assets/team_placeholder.jpg";
import nihalImg from "../assets/nihal.jpg";
import EcellLogo from "../assets/ecell-logo.png";

const teamMembers = [
    {
        id: 1,
        name: "Rutuja Deshmukh",
        role: "Core Team Member",
        subRole: "Overall Coordinator",
        phone: "+91 9022886503",
        email: "rutuja@example.com",
        image: teamPlaceholder,
    },
    {
        id: 2,
        name: "Nihal Kankal",
        role: "Core Team Member",
        subRole: "Overall Coordinator",
        phone: "+91 8766417815",
        email: "nihalk9876@gmail.com",
        image: nihalImg,
    },
    {
        id: 3,
        name: "Sanchit Dangra",
        role: "Core Team Member",
        subRole: "Overall Coordinator",
        phone: "+91 98765 43210",
        email: "sanchit@example.com",
        image: teamPlaceholder,
    },
    {
        id: 4,
        name: "Shripad Ingle",
        role: "Core Team Member",
        subRole: "Overall Coordinator",
        phone: "+91 98765 43210",
        email: "shripad@example.com",
        image: teamPlaceholder,
    },
    {
        id: 14,
        name: "Prarthna Kale",
        role: "Core Team Member",
        subRole: "Event Head",
        phone: "+91 98765 43210",
        email: "prarthna@example.com",
        image: teamPlaceholder,
    },
    {
        id: 5,
        name: "Vikas More",
        role: "Core Team Member",
        subRole: "Event Head",
        phone: "+91 98765 43210",
        email: "vikas@example.com",
        image: teamPlaceholder,
    },
    {
        id: 6,
        name: "Chakradhar Mahale",
        role: "Core Team Member",
        subRole: "Treasurer",
        phone: "+91 98765 43210",
        email: "chakradhar@example.com",
        image: teamPlaceholder,
    },
    {
        id: 7,
        name: "Om Konde",
        role: "Core Team Member",
        subRole: "Discipline Head",
        phone: "+91 98765 43210",
        email: "om@example.com",
        image: teamPlaceholder,
    },
    {
        id: 8,
        name: "Abhishek Kanherkar",
        role: "Core Team Member",
        subRole: "Management Head",
        phone: "+91 80103 24551",
        email: "abhishek@example.com",
        image: teamPlaceholder,
    },
    {
        id: 13,
        name: "Krushna Kokate",
        role: "Core Team Member",
        subRole: "NSS - President",
        phone: "+91 98765 43210",
        email: "krushna@example.com",
        image: teamPlaceholder,
    },
    {
        id: 15,
        name: "Vedant Darokar",
        role: "Core Team Member",
        subRole: "Design Head",
        phone: "+91 98765 43210",
        email: "vedant@example.com",
        image: teamPlaceholder,
    },
    {
        id: 16,
        name: "Ajinkya Surange",
        role: "Core Team Member",
        subRole: "Social Media Head",
        phone: "+91 98765 43210",
        email: "ajinkya@example.com",
        image: teamPlaceholder,
    },
    {
        id: 17,
        name: "Tanmay Kurekar",
        role: "Core Team Member",
        subRole: "Publicity Head",
        phone: "+91 98765 43210",
        email: "tanmay@example.com",
        image: teamPlaceholder,
    },
    {
        id: 9,
        name: "Aditya Patil",
        role: "Core Team Member",
        phone: "+91 98765 43210",
        email: "aditya@example.com",
        image: teamPlaceholder,
    },
    {
        id: 10,
        name: "Snehal Shinde",
        role: "Core Team Member",
        phone: "+91 98765 43210",
        email: "snehal@example.com",
        image: teamPlaceholder,
    },
    {
        id: 11,
        name: "Rohan Deshmukh",
        role: "Core Team Member",
        phone: "+91 98765 43210",
        email: "rohan@example.com",
        image: teamPlaceholder,
    },
    {
        id: 12,
        name: "Pooja Kulkarni",
        role: "Core Team Member",
        phone: "+91 98765 43210",
        email: "pooja@example.com",
        image: teamPlaceholder,
    },
];

const Team = () => {
    return (
        <div className="team-container">
            {/* Coordinating Team Section moved to top */}
            <div className="coordinating-section">
                <h2 className="section-title">Coordinating Team</h2>
                <div className="logo-container">
                    <img src={EcellLogo} alt="E-Cell SSGMCE" className="ecell-logo" />
                </div>
            </div>

            <h1 className="team-title">CORE TEAM</h1>
            <p className="team-subtitle">
                The dedicated minds behind Navonvesh 2026.
            </p>

            <div className="team-grid">
                {teamMembers.map((member) => (
                    <div key={member.id} className="team-card">
                        <div className="member-img">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            {member.subRole && (
                                <p style={{ color: "#00f3ff", fontSize: "0.85rem", marginTop: "-5px", marginBottom: "10px", fontWeight: "bold" }}>
                                    {member.subRole}
                                </p>
                            )}

                            <div className="contact-details">
                                <p>
                                    <FaPhone className="icon" /> {member.phone}
                                </p>
                                <p>
                                    <FaEnvelope className="icon" /> {member.email}
                                </p>
                            </div>

                            <div className="social-links">
                                <a href="#" className="social-icon">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaLinkedin />
                                </a>
                                <a href="#" className="social-icon">
                                    <FaXTwitter />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
