import React, { useState } from "react";
import "../Styles/projectExpo.css";
import girlsHostel1 from "../assets/girls_hostel_1.png";
import girlsHostel2 from "../assets/girls_hostel_2.png";
import girlsHostel3 from "../assets/girls_hostel_3.png";
import boysHostel1 from "../assets/boys_hostel_1.png";
import boysHostel2 from "../assets/boys_hostel_2.png";
import boysHostel3 from "../assets/boys_hostel_3.png";
import boysHostel4 from "../assets/boys_hostel_4.png";

const Accommodation = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
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

                        <form style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "60vh", overflowY: "auto", paddingRight: "5px" }}>
                            {/* Team Name */}
                            <div>
                                <label style={labelStyle}>Team Name</label>
                                <input type="text" style={inputStyle} placeholder="Enter Team Name" />
                            </div>

                            {/* Team Leader */}
                            <div style={sectionStyle}>
                                <h3 style={subHeaderStyle}>Team Leader</h3>
                                <input type="text" style={inputStyle} placeholder="Name" />
                                <input type="tel" style={inputStyle} placeholder="Phone No." />
                                <input type="email" style={inputStyle} placeholder="Email ID" />
                            </div>

                            {/* Member 2 */}
                            <div style={sectionStyle}>
                                <h3 style={subHeaderStyle}>Member 2</h3>
                                <input type="text" style={inputStyle} placeholder="Name" />
                                <input type="tel" style={inputStyle} placeholder="Phone No." />
                                <input type="email" style={inputStyle} placeholder="Email ID" />
                            </div>

                            {/* Member 3 */}
                            <div style={sectionStyle}>
                                <h3 style={subHeaderStyle}>Member 3</h3>
                                <input type="text" style={inputStyle} placeholder="Name" />
                                <input type="tel" style={inputStyle} placeholder="Phone No." />
                                <input type="email" style={inputStyle} placeholder="Email ID" />
                            </div>

                            {/* Member 4 */}
                            <div style={sectionStyle}>
                                <h3 style={subHeaderStyle}>Member 4</h3>
                                <input type="text" style={inputStyle} placeholder="Name" />
                                <input type="tel" style={inputStyle} placeholder="Phone No." />
                                <input type="email" style={inputStyle} placeholder="Email ID" />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="download-btn" style={{ marginTop: "10px" }}>
                                Submit Request
                            </button>
                        </form>
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
