import React, { useState, useEffect } from "react";
import "../Styles/team.css";
import { FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamPlaceholder from "../assets/team_placeholder.jpg";
import nihalImg from "../assets/nihal_latest.png";
import sanchitImg from "../assets/sanchit.png";
import tanmayImg from "../assets/tanmay.png";
import krushnaImg from "../assets/krushna.png";
import omImg from "../assets/om_konde_latest.png";
import principalImg from "../assets/principal.png";
import jadhaoImg from "../assets/jadhao.png";
import wahileImg from "../assets/ganesh_wahile.png";
import shrinitImg from "../assets/shrinit_latest.png";
import EcellLogo from "../assets/ecell-logo.png";
import shripadImg from "../assets/shripad_new.png";
import vedantImg from "../assets/vedant.png";
import abhishekImg from "../assets/abhishek_new.png";
import prarthnaImg from "../assets/prarthna.png";
import rutujaImg from "../assets/rutuja_new.png";
import ajinkyaImg from "../assets/ajinkya.png";
import chakradharImg from "../assets/chakradhar.png";
import vikasGawadeImg from "../assets/vikas_gawade.png";
import omDeshmukhImg from "../assets/om_deshmukh.png";
import atharvaSononeImg from "../assets/atharva_sonone.png";
import atharvaTayadeImg from "../assets/atharva_tayade.jpg";
import vikasMoreImg from "../assets/vikas_more.png";
import sushantAkhareImg from "../assets/sushant_akhare.png";
import manjiriImg from "../assets/manjiri_new.png";
import dollyImg from "../assets/dolly_bhutada.png";
import sakshiSiddhiImg from "../assets/sakshi_siddhi.png";
import hanzalaImg from "../assets/hanzala_khan.png";

const mentors = [
    {
        id: 1,
        name: "Dr. S. B. Somani",
        role: "Principal",
        image: principalImg,
        description: "Visionary leader guiding the institute towards academic excellence and innovation."
    },
    {
        id: 2,
        name: "Dr. S. S. Jadhao",
        role: "Event Incharge",
        image: jadhaoImg,
        description: "Dedicated mentor fostering technical growth and student development."
    },
    {
        id: 3,
        name: "Mr. Ganesh Wahile",
        role: "E-Cell Faculty Advisor",
        image: wahileImg,
        description: "Expert coordinator facilitating seamless execution of technical events."
    }
];

const teamMembers = [
    {
        id: 20,
        name: "Vikas Gawade",
        role: "Core Team Member",
        subRole: "Final Year Advisor",
        phone: "+91 8010324551",
        email: "vikas@example.com",
        image: vikasGawadeImg,
    },
    {
        id: 21,
        name: "Om Deshmukh",
        role: "Core Team Member",
        subRole: "Final Year Advisor",
        phone: "+91 98765 43210",
        email: "om@example.com",
        image: omDeshmukhImg,
    },
    {
        id: 4,
        name: "Shripad Ingle",
        role: "Core Team Member",
        subRole: "Final Year Advisor",
        phone: "+91 98765 43210",
        email: "shripad@example.com",
        image: shripadImg,
    },
    {
        id: 2,
        name: "Nihal Kankal",
        role: "Core Team Member",
        subRole: "Overall Head",
        phone: "+91 8766417815",
        email: "nihalk9876@gmail.com",
        image: nihalImg,
    },
    {
        id: 3,
        name: "Sanchit Dangra",
        role: "Core Team Member",
        subRole: "Overall Head",
        phone: "+91 98765 43210",
        email: "sanchit@example.com",
        image: sanchitImg,
    },
    {
        id: 1,
        name: "Rutuja Deshmukh",
        role: "Core Team Member",
        subRole: "Overall Head",
        subRole2: "E-Cell Chairperson",
        phone: "+91 9022886503",
        email: "rutuja@example.com",
        image: rutujaImg,
    },

    {
        id: 14,
        name: "Prarthna Kale",
        role: "Core Team Member",
        subRole: "Event Co-head",
        phone: "+91 98765 43210",
        email: "prarthna@example.com",
        image: prarthnaImg,
    },
    {
        id: 5,
        name: "Vikas More",
        role: "Core Team Member",
        subRole: "Technical Head",
        phone: "+91 98765 43210",
        email: "vikas@example.com",
        image: vikasMoreImg,
    },
    {
        id: 6,
        name: "Chakradhar Mahale",
        role: "Core Team Member",
        subRole: "Treasurer",
        subRole2: "E-Cell Vice Chairperson",
        phone: "+91 98765 43210",
        email: "chakradhar@example.com",
        image: chakradharImg,
    },
    {
        id: 7,
        name: "Abhishek Kanherkar",
        role: "Core Team Member",
        subRole: "Publicity Head",
        phone: "+91 8010324551",
        email: "abhishek@example.com",
        image: abhishekImg,
    },
    {
        id: 18,
        name: "Om Konde",
        role: "Core Team Member",
        subRole: "Discipline Head",
        phone: "+91 8669873156",
        email: "omkonde@gmail.com",
        image: omImg,
    },
    {
        id: 19,
        name: "Shrinit Chavan",
        role: "Core Team Member",
        subRole: "Management Head",
        phone: "+91 7774900204",
        email: "chavanshrinit@gmail.com",
        image: shrinitImg,
    },
    {
        id: 13,
        name: "Krushna Kokate",
        role: "Core Team Member",
        subRole: "Registration Team Head",
        phone: "+91 98765 43210",
        email: "krushna@example.com",
        image: tanmayImg,
    },
    {
        id: 26,
        name: "Atharva Tayade",
        role: "Core Team Member",
        subRole: "Report Writing Head",
        phone: "+91 98765 43210",
        email: "atharva@example.com",
        image: atharvaTayadeImg,
    },
    {
        id: 28,
        name: "Sakshi Kamble",
        role: "Core Team Member",
        subRole: "Report Writing Co-head",
        phone: "+91 98765 43210",
        email: "sakshi@example.com",
        image: sakshiSiddhiImg,
    },
    {
        id: 15,
        name: "Vedant Darokar",
        role: "Core Team Member",
        subRole: "Design Head",
        phone: "+91 98765 43210",
        email: "vedant@example.com",
        image: vedantImg,
    },
    {
        id: 29,
        name: "Hanzala Khan",
        role: "Core Team Member",
        subRole: "Graphics Head",
        phone: "+91 98765 43210",
        email: "hanzala@example.com",
        image: hanzalaImg,
    },
    {
        id: 16,
        name: "Ajinkya Surange",
        role: "Core Team Member",
        subRole: "Accommodation and Logistics Head",
        phone: "+91 98765 43210",
        email: "ajinkya@example.com",
        image: ajinkyaImg,
    },
    {
        id: 17,
        name: "Tanmay Kurekar",
        role: "Core Team Member",
        subRole: "Registration Team Head",
        phone: "+91 98765 43210",
        email: "tanmay@example.com",
        image: krushnaImg,
    },





    {
        id: 23,
        name: "Sushant Akhare",
        role: "Core Team Member",
        subRole: "Cultural Head",
        phone: "+91 98765 43210",
        email: "sushant@example.com",
        image: sushantAkhareImg,
    },
    {
        id: 24,
        name: "Manjiri Thakare",
        role: "Core Team Member",
        subRole: "Cultural Co-head",
        phone: "+91 98765 43210",
        email: "manjiri@example.com",
        image: manjiriImg,
    },
    {
        id: 30,
        name: "Shruti Mankar",
        role: "Core Team Member",
        subRole: "Decoration Co-head",
        phone: "+91 98765 43210",
        email: "shruti@example.com",
        image: sakshiSiddhiImg,
    },
    {
        id: 25,
        name: "Siddhi Kulkarni",
        role: "Core Team Member",
        subRole: "Accommodation and Logistics Co-head",
        phone: "+91 98765 43210",
        email: "siddhi@example.com",
        image: sakshiSiddhiImg,
    },

    {
        id: 8,
        name: "Atharva Sonone",
        role: "Core Team Member",
        subRole: "Volunteer Head ",
        phone: "+91 9999999999 ",
        email: "abhishek@example.com",
        image: atharvaSononeImg,
    },
    {
        id: 27,
        name: "Dolly Bhutada",
        role: "Core Team Member",
        subRole: "Volunteer Co-head",
        phone: "+91 98765 43210",
        email: "dolly@example.com",
        image: dollyImg,
    },
];

const Team = () => {
    return (
        <div className="team-container">


            <h1 className="team-title" style={{ marginTop: "40px" }}>MENTORS</h1>
            {/* Desktop Mentors Grid */}
            <div className="team-grid desktop-mentors" style={{ marginBottom: "60px" }}>
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="team-card mentor-card">
                        <div className="member-img">
                            <img src={mentor.image} alt={mentor.name} />
                            <div className="mentor-overlay">
                                <p className="mentor-description">{mentor.description}</p>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3>{mentor.name}</h3>
                            <p className="member-role">{mentor.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Mentors Continuous Scroll */}
            <div className="mobile-mentor-scroll">
                <div className="mentor-track">
                    {/* Concatenate large list for seamless loop */}
                    {[...mentors, ...mentors, ...mentors, ...mentors].map((mentor, index) => (
                        <div key={`${mentor.id}-${index}`} className="team-card mentor-card">
                            <div className="member-img">
                                <img src={mentor.image} alt={mentor.name} />
                            </div>
                            <div className="member-info">
                                <h3>{mentor.name}</h3>
                                <p className="member-role">{mentor.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Coordinating Team Section */}
            <div className="coordinating-section" style={{ marginBottom: "60px" }}>
                <h2 className="section-title">Coordinating Team</h2>
                <div className="logo-container">
                    <img src={EcellLogo} alt="E-Cell SSGMCE" className="ecell-logo" />
                </div>
            </div>

            <h1 className="team-title">CORE TEAM</h1>
            <p className="team-subtitle">
                The dedicated minds behind Navonvesh 2026.
            </p>

            {/* Core Team Grid - Top 6 Fixed Sequence */}
            <div className="team-grid core-team-top-grid" style={{ marginBottom: "40px" }}>
                {teamMembers.slice(0, 6).map((member) => (
                    <div key={member.id} className="team-card overall-head-card">
                        <div className="member-img">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>

                            {member.subRole && (
                                <p className="head-role">
                                    {member.subRole}
                                </p>
                            )}

                            {member.subRole2 && (
                                <p className="head-role secondary">
                                    {member.subRole2}
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

            <div className="team-grid heads-grid">
                {teamMembers.slice(6).map((member) => (
                    <div key={member.id} className="team-card">
                        <div className="member-img">
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="member-info">
                            <h3>{member.name}</h3>

                            {member.subRole && (
                                <p style={{ color: "#00f3ff", fontSize: "0.82rem", marginTop: "2px", marginBottom: "4px", fontWeight: "bold", lineHeight: "1.1" }}>
                                    {member.subRole}
                                </p>
                            )}

                            {member.subRole2 && (
                                <p style={{ color: "#00f3ff", fontSize: "0.72rem", marginTop: "0px", marginBottom: "8px", fontWeight: "bold", opacity: 0.9, lineHeight: "1.1" }}>
                                    {member.subRole2}
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
