import React, { useState } from 'react';
import '../Styles/culturalRegister.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronDown, FaTimes, FaWhatsapp } from 'react-icons/fa';

const CulturalRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        participantName: '',
        college: 'Shri Sant Gajanan Maharaj College of Engineering Shegaon',
        className: '',
        activity: 'solo singing',
        contact: '',
        email: '',
        member2Name: '',
        member2Class: '',
        groupSize: '',
        agreed: false
    });

    const classes = [
        "1S", "1R", "1M", "1U1", "1U2", "1N",
        "2S", "2N", "2R", "2U1", "2U2", "2M",
        "3U1", "3U2", "3S", "3N", "3R"
    ];

    const activities = [
        "solo singing", "duo singing", "solo dance", "duo dance",
        "group dance", "anchoring", "guitar", "flute", "tabla", "other"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isDuo = formData.activity.toLowerCase().includes('duo');
    const isGroup = formData.activity.toLowerCase().includes('group');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/cultural`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                alert(data.error || "Submission failed");
            }
        } catch (error) {
            console.error("Submission failed", error);
            alert("Submission encountered an error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cultural-container">
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
                                <span className="success-highlight">Cultural (कलास्पंदन '26)</span>
                            </p>

                            <p className="success-slogan">
                                "Celebrate innovation through creativity."
                            </p>

                            <div className="file-reminder" style={{ marginBottom: '20px', color: '#94a3b8', fontSize: '0.85rem' }}>
                                <p>Note: We will collect performance files later via WhatsApp group.</p>
                            </div>

                            <a
                                href="https://chat.whatsapp.com/Jcn9gVixZ9C4FA5cKEajfR?mode=gi_t"
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
                    <h1 className="cultural-title">कलास्पंदन '26 <span>CULTURAL</span></h1>
                    <p className="cultural-subtitle">Register your performance for the Auditions.</p>
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
                        <label>College Name</label>
                        <input
                            type="text"
                            name="college"
                            className="college-input"
                            value={formData.college}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Class</label>
                            <div className="select-wrapper">
                                <select
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Class</option>
                                    {classes.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="select-arrow" />
                            </div>
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
                                    {activities.map(a => (
                                        <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="select-arrow" />
                            </div>
                        </div>
                    </div>

                    {isDuo && (
                        <div className="duo-section animate-fade-in" style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            marginBottom: '10px'
                        }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#c084fc', marginBottom: '15px', textTransform: 'uppercase' }}>Group Member 2 Details</h3>
                            <div className="input-group" style={{ marginBottom: '15px' }}>
                                <label>Member 2 Name</label>
                                <input
                                    type="text"
                                    name="member2Name"
                                    placeholder="Enter full name"
                                    value={formData.member2Name}
                                    onChange={handleChange}
                                    required={isDuo}
                                />
                            </div>
                            <div className="input-group">
                                <label>Member 2 Class</label>
                                <div className="select-wrapper">
                                    <select
                                        name="member2Class"
                                        value={formData.member2Class}
                                        onChange={handleChange}
                                        required={isDuo}
                                    >
                                        <option value="" disabled>Select Class</option>
                                        {classes.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <FaChevronDown className="select-arrow" />
                                </div>
                            </div>
                        </div>
                    )}

                    {isGroup && (
                        <div className="group-section animate-fade-in" style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            marginBottom: '10px'
                        }}>
                            <h3 style={{ fontSize: '0.9rem', color: '#c084fc', marginBottom: '15px', textTransform: 'uppercase' }}>Group Details</h3>
                            <div className="input-group">
                                <label>Team Size (Number of members)</label>
                                <input
                                    type="number"
                                    name="groupSize"
                                    min="3"
                                    max="20"
                                    placeholder="e.g. 8"
                                    value={formData.groupSize}
                                    onChange={handleChange}
                                    required={isGroup}
                                />
                            </div>
                        </div>
                    )}

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

                    <div className="terms-container">
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            required
                            className="terms-checkbox"
                        />
                        <label className="terms-label">
                            I agree to the <span className="terms-link">Terms and Conditions</span>
                        </label>
                    </div>

                    <button type="submit" className="submit-interstellar-btn" disabled={loading || !formData.agreed}>
                        {loading ? "Transmitting..." : "Initialize Registration"}
                    </button>

                    <p className="form-footer-note">
                        Note: Performance files will be collected via WhatsApp group.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default CulturalRegister;
