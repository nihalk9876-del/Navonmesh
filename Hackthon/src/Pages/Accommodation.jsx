import React, { useState } from "react";
import "../Styles/projectExpo.css";
import "../Styles/accommodationHead.css"; // Add new CSS import
import { FaPhone, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import girlsHostel1 from "../assets/girls_hostel_1.png";
import girlsHostel2 from "../assets/girls_hostel_2.png";
import girlsHostel3 from "../assets/girls_hostel_3.png";
import boysHostel1 from "../assets/boys_hostel_1.png";
import boysHostel2 from "../assets/boys_hostel_2.png";
import boysHostel3 from "../assets/boys_hostel_3.png";
import boysHostel4 from "../assets/boys_hostel_4.png";

const Accommodation = () => {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [formData, setFormData] = useState({
        event: "",
        teamName: "",
        lName: "", lPhone: "", lEmail: "", lGender: "",
        m2Name: "", m2Phone: "", m2Email: "", m2Gender: "",
        m3Name: "", m3Phone: "", m3Email: "", m3Gender: "",
        m4Name: "", m4Phone: "", m4Gender: ""
    });

    const toggleModal = () => {
        setShowModal(!showModal);
        if (!showModal) setStatus("idle");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        const formBody = new FormData();
        // Event
        formBody.append("entry.437555754", formData.event);
        // Team Name
        formBody.append("entry.628190576", formData.teamName);

        // Leader
        formBody.append("entry.1785895541", formData.lName);
        formBody.append("entry.267325415", formData.lPhone);
        formBody.append("entry.212550817", formData.lEmail);
        formBody.append("entry.1875083212", formData.lGender);

        // Mem 2
        formBody.append("entry.1488013474", formData.m2Name);
        formBody.append("entry.47243977", formData.m2Phone);
        formBody.append("entry.1688814770", formData.m2Email);
        formBody.append("entry.133775330", formData.m2Gender);

        // Mem 3
        formBody.append("entry.390616939", formData.m3Name);
        formBody.append("entry.672976952", formData.m3Phone);
        formBody.append("entry.585274052", formData.m3Email);
        formBody.append("entry.159855008", formData.m3Gender);

        // Mem 4 (No Email in pre-fill)
        formBody.append("entry.1946311722", formData.m4Name);
        formBody.append("entry.1857373829", formData.m4Phone);
        formBody.append("entry.1783657060", formData.m4Gender);

        try {
            await fetch("https://docs.google.com/forms/d/e/1FAIpQLSe7iMwg7gvgYuJMsMMlrpPyvfMsVoK1-KKw_Iiq3xoO2pMkWQ/formResponse", {
                method: "POST",
                mode: "no-cors",
                body: formBody
            });
            setStatus("success");
        } catch (err) {
            console.error(err);
            alert("Submission failed. Please try again.");
            setStatus("error");
        }
    };

    return (
        <div style={{ paddingTop: "100px", minHeight: "100vh", paddingBottom: "50px" }} id="accommodation">
            <h1 style={{
                textAlign: "center",
                fontFamily: "'Orbitron', sans-serif",
                color: "#8f8bff",
                marginBottom: "20px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: "2rem"
            }}>
                Accommodation
            </h1>

            <div className="accommodation-content" style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", color: "#ccc", padding: "0 20px" }}>

                {/* Intro Section */}
                <div style={{ marginBottom: "40px", background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "10px" }}>
                    <h2 style={{ color: "#00f3ff", marginBottom: "15px", fontFamily: "'Inter', sans-serif" }}>About SSGMCE Campus</h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "15px" }}>
                        Shri Sant Gajanan Maharaj College of Engineering, Shegaon, offers a lush green,
                        sprawling campus equipped with state-of-the-art facilities.
                        It provides a serene environment perfect for learning and innovation.
                    </p>
                    <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#44ff88" }}>
                        ✨ Accommodation is Completely FREE for all participants! ✨
                    </p>
                </div>

                <p style={{ marginBottom: "30px", fontSize: "1.1rem", lineHeight: "1.6" }}>
                    Traveling from afar? We've got you covered.
                    <br />
                    Secure your comfortable stay at our campus hostels.
                    <br />
                    <span style={{ color: "#4488ff", fontSize: "0.9rem" }}>*Limited slots available for participants.</span>
                </p>

                {/* Register Button */}
                <button
                    className="download-btn"
                    onClick={toggleModal}
                    style={{ maxWidth: "300px", margin: "0 auto 50px auto" }}
                >
                    Register for Accommodation
                </button>

                {/* Hostels Showcase */}
                <div className="hostels-showcase">

                    {/* Left Part: Boys Hostels */}
                    <div className="hostel-category">
                        <h3 style={{ color: "#4488ff", fontSize: "1.8rem", marginBottom: "20px", borderBottom: "1px solid #4488ff", display: "inline-block", paddingBottom: "5px" }}>
                            Boys Hostels
                        </h3>
                        <div className="hostel-grid">
                            <div className="hostel-card">
                                <img src={boysHostel1} alt="Sant Guru Nanak & Sant Kabir Boys Hostel" />
                                <p>Sant Guru Nanak & Sant Kabir Hostel</p>
                            </div>
                            <div className="hostel-card">
                                <img src={boysHostel2} alt="Swami Vivekanand Boys Hostel" />
                                <p>Swami Vivekanand Hostel</p>
                            </div>
                            <div className="hostel-card">
                                <img src={boysHostel3} alt="Adya Shankaracharya Boys Hostel" />
                                <p>Adya Shankaracharya Hostel</p>
                            </div>
                            <div className="hostel-card">
                                <img src={boysHostel4} alt="Sant Dnyaneshwar Boys Hostel" />
                                <p>Sant Dnyaneshwar Hostel</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Part: Girls Hostels */}
                    <div className="hostel-category">
                        <h3 style={{ color: "#ff88dd", fontSize: "1.8rem", marginBottom: "20px", borderBottom: "1px solid #ff88dd", display: "inline-block", paddingBottom: "5px" }}>
                            Girls Hostels
                        </h3>
                        {/* Wrapper div for grid layout */}
                        <div className="hostel-grid">
                            <div className="hostel-card">
                                <img src={girlsHostel1} alt="Sant Meerabai Girls Hostel" />
                                <p>Sant Meerabai Hostel</p>
                            </div>
                            <div className="hostel-card">
                                <img src={girlsHostel2} alt="Sant Janabai Girls Hostel" />
                                <p>Sant Janabai Hostel</p>
                            </div>
                            <div className="hostel-card">
                                <img src={girlsHostel3} alt="Sant Muktabai Girls Hostel" />
                                <p>Sant Muktabai Hostel</p>
                            </div>
                        </div>
                    </div>

                    {/* Accommodation Head Section */}
                    <div className="accommodation-head-container">
                        <div className="cosmos-box">
                            <div className="star-accent" style={{ top: '10%', left: '10%' }}></div>
                            <div className="star-accent" style={{ top: '80%', right: '15%' }}></div>

                            <h2 className="cosmos-title">Accommodation & Logistics Head</h2>

                            <div className="head-details">
                                <h3 className="head-name">Ajinkya Surange</h3>

                                <div className="head-contact-item">
                                    <FaPhone className="contact-icon" />
                                    <span>+91 9604765998</span>
                                </div>

                                <div className="head-contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <span>surangeajinkya9@gmail.com</span>
                                </div>

                                <div className="head-socials">
                                    <a href="https://www.instagram.com/ajinkyasurange?igsh=MW80am1ycXF4bGE4dg==" target="_blank" rel="noopener noreferrer" className="social-btn">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://www.linkedin.com/in/ajinkya-surange-8797593ab?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="social-btn">
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Registration Modal */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(5px)",
                    zIndex: 2000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px"
                }}>
                    <div style={{
                        background: "rgba(20, 20, 35, 0.95)",
                        border: "1px solid #4488ff",
                        borderRadius: "15px",
                        padding: "30px",
                        width: "100%",
                        maxWidth: "500px",
                        position: "relative",
                        boxShadow: "0 0 25px rgba(68, 136, 255, 0.4)",
                        color: "white",
                        fontFamily: "Arial, sans-serif"
                    }}>
                        {/* Close Button (X) */}
                        <button
                            onClick={toggleModal}
                            type="button"
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                background: "transparent",
                                border: "none",
                                color: "#ff4444",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            ✕
                        </button>

                        <h2 style={{ textAlign: "center", color: "#4488ff", marginBottom: "20px", textTransform: "uppercase" }}>
                            Accommodation Form
                        </h2>

                        {status === "success" ? (
                            <div style={{ textAlign: "center", padding: "20px" }}>
                                <h3 style={{ color: "#44ff88", fontSize: "1.5rem", marginBottom: "15px" }}>Request Submitted!</h3>
                                <p style={{ color: "#ccc", marginBottom: "20px" }}>
                                    Your accommodation request has been received.
                                </p>
                                <button className="download-btn" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "60vh", overflowY: "auto", paddingRight: "5px" }}>

                                {/* Event */}
                                <div>
                                    <label style={labelStyle}>Select Event <span style={{ color: 'red' }}>*</span></label>
                                    <select name="event" value={formData.event} onChange={handleChange} required style={inputStyle}>
                                        <option value="">Choose Event</option>
                                        <option value="SRUJAN">Srujan (Hackathon)</option>
                                        <option value="ANKUR">Ankur (Project Expo)</option>
                                        <option value="UDBHAV">Uddhav (Conference)</option>
                                    </select>
                                </div>

                                {/* Team Name */}
                                <div>
                                    <label style={labelStyle}>Team Name <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} required style={inputStyle} placeholder="Enter Team Name" />
                                </div>

                                {/* Team Leader */}
                                <div style={sectionStyle}>
                                    <h3 style={subHeaderStyle}>Team Leader <span style={{ fontSize: '0.8rem', color: '#aaa' }}>(Member 1)</span></h3>
                                    <input type="text" name="lName" value={formData.lName} onChange={handleChange} required style={inputStyle} placeholder="Name *" />
                                    <input type="tel" name="lPhone" value={formData.lPhone} onChange={handleChange} required style={inputStyle} placeholder="Phone No. *" />
                                    <input type="email" name="lEmail" value={formData.lEmail} onChange={handleChange} required style={inputStyle} placeholder="Email ID *" />
                                    <select name="lGender" value={formData.lGender} onChange={handleChange} required style={inputStyle}>
                                        <option value="">Select Gender *</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Member 2 */}
                                <div style={sectionStyle}>
                                    <h3 style={subHeaderStyle}>Member 2</h3>
                                    <input type="text" name="m2Name" value={formData.m2Name} onChange={handleChange} style={inputStyle} placeholder="Name" />
                                    <input type="tel" name="m2Phone" value={formData.m2Phone} onChange={handleChange} style={inputStyle} placeholder="Phone No." />
                                    <input type="email" name="m2Email" value={formData.m2Email} onChange={handleChange} style={inputStyle} placeholder="Email ID" />
                                    <select name="m2Gender" value={formData.m2Gender} onChange={handleChange} style={inputStyle}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Member 3 */}
                                <div style={sectionStyle}>
                                    <h3 style={subHeaderStyle}>Member 3</h3>
                                    <input type="text" name="m3Name" value={formData.m3Name} onChange={handleChange} style={inputStyle} placeholder="Name" />
                                    <input type="tel" name="m3Phone" value={formData.m3Phone} onChange={handleChange} style={inputStyle} placeholder="Phone No." />
                                    <input type="email" name="m3Email" value={formData.m3Email} onChange={handleChange} style={inputStyle} placeholder="Email ID" />
                                    <select name="m3Gender" value={formData.m3Gender} onChange={handleChange} style={inputStyle}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Member 4 */}
                                <div style={sectionStyle}>
                                    <h3 style={subHeaderStyle}>Member 4</h3>
                                    <input type="text" name="m4Name" value={formData.m4Name} onChange={handleChange} style={inputStyle} placeholder="Name" />
                                    <input type="tel" name="m4Phone" value={formData.m4Phone} onChange={handleChange} style={inputStyle} placeholder="Phone No." />
                                    {/* Email Removed as per form */}
                                    <select name="m4Gender" value={formData.m4Gender} onChange={handleChange} style={inputStyle}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="download-btn" disabled={status === "submitting"} style={{ marginTop: "10px", opacity: status === "submitting" ? 0.7 : 1 }}>
                                    {status === "submitting" ? "Submitting..." : "Submit Request"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable Styles
const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #333",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    outline: "none",
    fontSize: "0.9rem",
    marginBottom: "8px"
};

const labelStyle = {
    display: "block",
    marginBottom: "5px",
    color: "#aaa",
    fontSize: "0.9rem"
};

const sectionStyle = {
    padding: "10px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px"
};

const subHeaderStyle = {
    color: "#4488ff",
    fontSize: "1rem",
    marginBottom: "10px",
    borderBottom: "1px solid rgba(68, 136, 255, 0.3)",
    paddingBottom: "5px"
};

export default Accommodation;
