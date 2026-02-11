import React, { useState } from 'react';
import '../Styles/culturalRegister.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUpload, FaChevronDown, FaCheckCircle, FaTimes, FaWhatsapp } from 'react-icons/fa';

const CulturalRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        participantName: '',
        groupName: '',
        activity: 'solo dance',
        contact: '',
        email: '',
        file: null,
        agreed: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) {
            alert("File size exceeds 10MB limit.");
            return;
        }
        setFormData(prev => ({ ...prev, file: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSekbdIAKF789NOhg6LrcJMlJ58Uc0mlMiFceQ2pzrrMrO5L9Q/formResponse";

        // Use FormData instead of URLSearchParams for better compatibility with Google Forms multipart expectations
        const formBody = new FormData();

        // Exact mappings from your pre-fill link
        formBody.append("entry.2005620554", formData.participantName);
        formBody.append("entry.1166974658", formData.groupName);
        formBody.append("entry.1045781291", formData.activity); // Matches exactly like "Solo dance"
        formBody.append("entry.1065046570", formData.contact);
        formBody.append("entry.239076559", formData.email);
        formBody.append("entry.839337160", "N/A"); // Adding the extra field from your pre-fill link to ensure submission success

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formBody
            });

            // Artificial delay to make it feel real before showing modal
            setTimeout(() => {
                setSubmitted(true);
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Submission failed", error);
            alert("Submission encountered an error. Please check your connection and try again.");
            setLoading(false);
        }
    };

    return (
        <div className="cultural-container">
            {/* SUCCESS MODAL EXACTLY LIKE REGISTER.JSX */}
            {submitted && (
                <div className="modal-overlay">
                    <div className="modal-content-wrapper">
                        <button className="modal-close-btn" onClick={() => navigate('/')}>
                            <FaTimes />
                        </button>

                        <div className="register-content-modal">
                            <h2 className="success-title">Thank You!</h2>
                            <p className="success-body">
                                You have successfully registered for <br />
                                <span className="success-highlight">Cultural (उद्भव)</span>
                            </p>

                            <p className="success-slogan">
                                "Celebrate innovation through creativity."
                            </p>

                            <div className="file-reminder" style={{ marginBottom: '20px', color: '#94a3b8', fontSize: '0.85rem' }}>
                                <p>Note: If you have a performance file to upload, please ensure you complete the process on the official form if not already done.</p>
                            </div>

                            <a
                                href="https://whatsapp.com/channel/0029VbCVzgbBlHpY1prIRI1m"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                            >
                                <FaWhatsapp className="whatsapp-icon" /> Join WhatsApp Group
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <div className="cultural-content glass-card">
                <button className="back-btn-top" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Exit
                </button>

                <div className="header-section">
                    <h1 className="cultural-title">उद्भव <span>CULTURAL</span></h1>
                    <p className="cultural-subtitle">Register your performance for the grand night.</p>
                </div>

                <form className="cultural-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name of Participant / Lead</label>
                        <input
                            type="text"
                            name="participantName"
                            placeholder="Enter full name"
                            value={formData.participantName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Name of Group (if any)</label>
                        <input
                            type="text"
                            name="groupName"
                            placeholder="Group Name or Solo"
                            value={formData.groupName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Activity Selection</label>
                        <div className="select-wrapper">
                            <select
                                name="activity"
                                value={formData.activity}
                                onChange={handleChange}
                                required
                            >
                                <option value="Solo dance">Solo Dance</option>
                                <option value="Duo dance">Duo Dance</option>
                                <option value="Group dance">Group Dance</option>
                                <option value="Singing">Singing</option>
                            </select>
                            <FaChevronDown className="select-arrow" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Contact Number</label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="Contact no."
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="upload-section">
                        <label>Upload Performance Track (Max 10MB)</label>
                        <div className="file-drop-zone">
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                accept="audio/*,video/*"
                            />
                            <label htmlFor="file-upload" className="file-label">
                                <FaUpload />
                                {formData.file ? formData.file.name : "Choose File or Drag & Drop"}
                            </label>
                        </div>
                        <p className="file-help">Accepted formats: MP3, MP4, WAV. Max size: 10MB.</p>
                    </div>

                    <div className="terms-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0', paddingLeft: '5px' }}>
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            required
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#ff007a' }}
                        />
                        <label style={{ fontSize: '0.9rem', color: '#e0e0e0', cursor: 'pointer' }}>
                            I agree to the <span style={{ color: '#ff007a', textDecoration: 'underline' }}>Terms and Conditions</span>
                        </label>
                    </div>

                    <button type="submit" className="submit-interstellar-btn" disabled={loading || !formData.agreed}>
                        {loading ? "Transmitting..." : "Initialize Registration"}
                    </button>

                    <p className="form-footer-note">
                        Registration data will be synced with Mission Control database.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default CulturalRegister;
