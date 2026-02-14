import React, { useState } from "react";
import "../Styles/team.css";
import { FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import teamPlaceholder from "../assets/team_placeholder.png";
import nihalImg from "../assets/nihal_latest.png";
import divineImg from "../assets/divine_blessings.png";
import sanchitImg from "../assets/sanchit_new.png";
import tanmayImg from "../assets/tanmay.png";
import krushnaImg from "../assets/krushna.png";
import omImg from "../assets/om_konde_latest.png";
import principalImg from "../assets/principal.png";
import jadhaoImg from "../assets/jadhao.png";
import wahileImg from "../assets/ganesh_wahile.png";
import shrinitImg from "../assets/shrinit_latest.png";
import EcellLogo from "../assets/ecell-logo.png";
import shripadImg from "../assets/shripad_new.png";
import vedantImg from "../assets/vedant_latest.png";
import abhishekImg from "../assets/abhishek_new.png";
import prarthnaImg from "../assets/prarthna.jpeg";
import rutujaImg from "../assets/rutuja_latest_v2.png";
import ajinkyaImg from "../assets/ajinkya.png";
import chakradharImg from "../assets/chakradhar.png";
import vikasGawadeImg from "../assets/vikas_gawade.png";
import omDeshmukhImg from "../assets/om_deshmukh.png";
import atharvaSononeImg from "../assets/atharva_sonone.png";
import atharvaTayadeImg from "../assets/atharva_tayade.png";
import vikasMoreImg from "../assets/vikas_more.png";
import sushantAkhareImg from "../assets/sushant_akhare.png";
import manjiriImg from "../assets/manjiri_new.png";
import dollyImg from "../assets/dolly_bhutada.png";
import sakshiImg from "../assets/sakshi_kamble.png";
import siddhiImg from "../assets/siddhi_kulkarni.png";
import hanzalaImg from "../assets/hanzala_khan.png";
import satyajeetImg from "../assets/satyajeet.png";
import thuteImg from "../assets/thute.png";
import kankaleImg from "../assets/kankale.png";
import zamareImg from "../assets/zamare.png";
import dharmaleImg from "../assets/dharmale.png";
import buteImg from "../assets/bute.png";
import gawandeImg from "../assets/gawande.png";
import mishraImg from "../assets/mishra.png";
import chandanImg from "../assets/chandan.png";
import shrutiMankarImg from "../assets/shruti_mankar.png";
import dhanashriImg from "../assets/dhanashri_borde.png"
import omTaleImg from "../assets/om_tale.png";
import bannerImg from "../assets/coordinating_team_banner.png";
import PursuitLogo from "../assets/pursuitlogo.png";
import imgPranita from "../assets/pranita.png";
import NavonmeshLogo from "../assets/namonvesh-logo.png";


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
        name: "Dr.S.S.Jadhao",
        role: "convener",
        image: jadhaoImg,
        description: "Dedicated mentor fostering technical growth and student development."
    },
    {
        id: 3,
        name: "Mr. Ganesh Wahile",
        role: "E-Cell Faculty Advisor",
        image: wahileImg,
        description: "Expert coordinator facilitating seamless execution of technical events."
    },
    {
        id: 4,
        name: "Dr. V. K. Thute",
        role: "Faculty Advisor",
        image: thuteImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 5,
        name: "Dr. R. S. Kankale",
        role: "Faculty Advisor",
        image: kankaleImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 6,
        name: "Dr. R. A. Zamare",
        role: "Faculty Advisor",
        image: zamareImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 7,
        name: "Dr. N. S. Dharmale",
        role: "Faculty Advisor",
        image: dharmaleImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 8,
        name: "Miss P. P. Bute",
        role: "Faculty Advisor",
        image: buteImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 9,
        name: "Dr. J. S. Gawande",
        role: "Faculty Advisor",
        image: gawandeImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 10,
        name: "Dr. S. M. Mishra",
        role: "Faculty Advisor",
        image: mishraImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
    },
    {
        id: 11,
        name: "Dr. K. V. Chandan",
        role: " Pursuit Faculty Advisor",
        image: chandanImg,
        description: "Dedicated faculty member supporting the Navonmesh mission."
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
        instagram: "#",
        linkedin: "#",
        image: omDeshmukhImg,
    },
    {
        id: 4,
        name: "Shripad Ingle",
        role: "Core Team Member",
        subRole: "Final Year Advisor",
        phone: "+91 9876543210",
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
        phone: "+91 9022886503",
        email: "rutujadeshmukh1512@gmail.com",
        instagram: "https://www.instagram.com/rutujadeshmukh157?igsh=MXQwd2dwY21lazg5eA==",
        linkedin: "https://www.linkedin.com/in/rutuja-deshmukh-3aa0a03aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: rutujaImg,
    },

    {
        id: 26,
        name: "Atharva Tayade",
        role: "Core Team Member",
        subRole: "HEAD(सृजन)",
        phone: "+91 8767968475",
        email: "tayadeatharva12@gmail.com",
        instagram: "https://www.instagram.com/atharva_tayade_?igsh=dWFnaW43NDE0MTMx",
        linkedin: "https://www.linkedin.com/in/atharva-tayade-b63449294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: atharvaTayadeImg,
    },
    {
        id: 13,
        name: "Krushna Kokate",
        role: "Core Team Member",
        subRole: "HEAD (अंकुर)",
        phone: "+91 8261905585",
        email: "krushnakokate829@gmail.com",
        instagram: "https://www.instagram.com/krushna_kokate25?igsh=MTNwbGtpeml0aGJlNA==",
        linkedin: "https://www.linkedin.com/in/krushna-kokate-591009329?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        image: tanmayImg,
    },
    {
        id: 5,
        name: "Vikas More",
        role: "Core Team Member",
        subRole: "HEAD (उद्भव)",
        phone: "+91 98765 43210",
        email: "vikas@example.com",
        image: vikasMoreImg,
    },
    {
        id: 15,
        name: "Vedant Darokar",
        role: "Core Team Member",
        subRole: "HEAD(PURSUIT)",
        phone: "+91 98765 43210",
        email: "vedant@example.com",
        image: vedantImg,
    },
    {
        id: 34,
        name: "Dhanashri Borde",
        role: "Core Team Member",
        subRole: "Event Head",
        phone: "+91 7387546722",
        email: "dhanashriborde206@gmail.com",
        image: dhanashriImg,
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
        id: 6,
        name: "Chakradhar Mahale",
        role: "Core Team Member",
        subRole: "Treasurer",
        phone: "+91 7350976698",
        email: "chakradharmahale7@gmail.com",
        instagram: "https://www.instagram.com/chakradharmahale01",
        linkedin: "#",
        image: chakradharImg,
    },
    {
        id: 7,
        name: "Abhishek Kanherkar",
        role: "Core Team Member",
        subRole: "Publicity Head",
        phone: "+91 8010324551",
        email: "abhishek.kanherkar3@gmail.com",
        instagram: "https://www.instagram.com/abhishekkanherkar03?igsh=MXM2bTZlaXd3OWw0Zw==",
        linkedin: "https://www.linkedin.com/in/abhishek-kanherkar-2124083ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: abhishekImg,
    },
    {
        id: 33,
        name: "Pratik Mapari",
        role: "Core Team Member",
        subRole: "Discipline Co-Head",
        phone: "+91 9764315703",
        email: "pratikmapari61@gmail.com",
        instagram: "https://www.instagram.com/theprxtik?igsh=MXhuZmE5M2YwcjFkZQ==",
        linkedin: "https://www.linkedin.com/in/pratik-mapari-b259aa289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: teamPlaceholder,
    },
    {
        id: 18,
        name: "Om Konde",
        role: "Core Team Member",
        subRole: "Discipline Head",
        phone: "+91 8669873156",
        email: "kondeom970@gmail.com",
        instagram: "https://www.instagram.com/om_3105_?igsh=ZHBxYmZoaWtmZm8x",
        linkedin: "https://www.linkedin.com/in/om-konde-bb48b2290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: omImg,
    },
    {
        id: 19,
        name: "Shrinit Chavan",
        role: "Core Team Member",
        subRole: "Management Head",
        phone: "+91 7774900204",
        email: "chavanshrinit@gmail.com",
        instagram: "https://www.instagram.com/_aniket_patil__0?igsh=azZ6ZGw0Ymtxemow",
        linkedin: "https://www.linkedin.com/in/shrinit-chavan-106224295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: shrinitImg,
    },

    {
        id: 28,
        name: "Sakshi Kamble",
        role: "Core Team Member",
        subRole: "Report Writing Co-head",
        phone: "+91 98765 43210",
        email: "sakshi@example.com",
        image: sakshiImg,
    },
    {
        id: 29,
        name: "Hanzala Khan",
        role: "Core Team Member",
        subRole: "Graphics Head",
        phone: "+91 7410799739",
        email: "hanzalakhan004az@gmail.com",
        instagram: "https://www.instagram.com/hanzala_khan_0004",
        linkedin: "https://www.linkedin.com/in/hanzala-khan-068885294",
        image: hanzalaImg,
    },
    {
        id: 16,
        name: "Ajinkya Surange",
        role: "Core Team Member",
        subRole: "Accommodation and Logistics Head",
        phone: "+91 9604765998",
        email: "surangeajinkya9@gmail.com",
        instagram: "https://www.instagram.com/ajinkyasurange?igsh=MW80am1ycXF4bGE4dg==",
        linkedin: "https://www.linkedin.com/in/ajinkya-surange-8797593ab?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
        phone: "+91 8767872382",
        email: "sushant.akhare@gmail.com",
        instagram: "https://www.instagram.com/sushant.akhare?igsh=MWV5dGwyNjF5Y3gwZA==",
        linkedin: "https://www.linkedin.com/in/sushant-akhare-0505ba31b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
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
        image: shrutiMankarImg,
    },
    {
        id: 25,
        name: "Siddhi Kulkarni",
        role: "Core Team Member",
        subRole: "Registration co-head",
        phone: "+91 98765 43210",
        email: "siddhi@example.com",
        image: siddhiImg,
    },

    {
        id: 8,
        name: "Atharva Sonone",
        role: "Core Team Member",
        subRole: "Volunteer Head ",
        phone: "+91 9834428773",
        email: "atharvsonone98@gmail.com",
        instagram: "https://www.instagram.com/atharv_sonone_?igsh=MnRnM2JxZGoxejly",
        linkedin: "https://www.linkedin.com/in/atharv-sonone-43a707335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: atharvaSononeImg,
    },
    {
        id: 31,
        name: "Satyajeet Patil",
        role: "Core Team Member",
        subRole: "Volunteer Head",
        phone: "+91 98765 43210",
        email: "satyajeet@example.com",
        image: satyajeetImg,
    },
    {
        id: 27,
        name: "Dolly Bhutada",
        role: "Core Team Member",
        subRole: "Volunteer Co-head",
        phone: "+91 8459701982",
        email: "dollybhutada05@gmail.com",
        instagram: "https://www.instagram.com/dolly_bhutada?igsh=YTljcjdwd3J0NWZq",
        linkedin: "https://www.linkedin.com/in/dolly-bhutada-45937a350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        image: dollyImg,
    },
    {
        id: 35,
        name: "Om Tale",
        role: "Core Team Member",
        subRole: "Volunteer Co-head",
        phone: "+91 9834428773",
        email: "mahadevtale81@gmail.com",
        instagram: "https://www.instagram.com/omuuu__143?utm_source=qr&igsh=bnRraXVzMnI5MG1k",
        image: omTaleImg,
    },
    {
        id: 36,
        name: "Pranita Warade",
        role: "Core Team Member",
        subRole: "Technical co-head",
        phone: "+91 93561 15794",
        email: "pranitawarade03@gmail.com",
        image: imgPranita,
    },
];


const Team = () => {
    const [showAllCoreTeam, setShowAllCoreTeam] = useState(false);

    return (
        <div className="team-container">


            <div className="divine-section" style={{ marginTop: "60px" }}>
                <h2 className="divine-text">By the divine blessings of</h2>
                <div className="divine-img-container">
                    <img src={divineImg} alt="Divine Blessing" />
                </div>
                <h3 className="marathi-text">श्री संत गजानन महाराज,शेगाव</h3>
            </div>

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
            <div className="coordinating-section" style={{ marginBottom: "60px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 className="section-title">Coordinating Team</h2>
                <div className="logo-container logos-row">
                    <img src={EcellLogo} alt="E-Cell Logo" className="team-logo ecell-logo-img" />
                    <img src={NavonmeshLogo} alt="Navonmesh Logo" className="team-logo navonmesh-logo-img" />
                    <img src={PursuitLogo} alt="Pursuit Logo" className="team-logo pursuit-logo-img" />
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
                                <a href={member.instagram || "#"} target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaInstagram />
                                </a>
                                <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="social-icon">
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

            {!showAllCoreTeam && (
                <div className="view-more-container">
                    <button
                        className="view-core-btn interstellar-btn"
                        onClick={() => setShowAllCoreTeam(true)}
                    >
                        <span>View Core Team</span>
                        <div className="star-particles"></div>
                    </button>
                    <p className="core-team-slogan">
                        Beyond the horizon, navigating the frontiers of innovation.
                    </p>
                </div>
            )}

            {showAllCoreTeam && (
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
                                    <a href={member.instagram || "#"} target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <FaInstagram />
                                    </a>
                                    <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="social-icon">
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
            )}
        </div>
    );
};

export default Team;
