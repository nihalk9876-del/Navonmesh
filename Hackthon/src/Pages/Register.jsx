import React, { useState, useEffect } from 'react';
import '../Styles/register.css';
import { FaGoogle, FaWhatsapp, FaTimes, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const urlEvent = queryParams.get('event');

    useEffect(() => {
        if (urlEvent === 'pursuit') {
            window.location.href = "https://pursuitssgmce.vercel.app/";
        }
    }, [urlEvent]);

    const [formData, setFormData] = useState({
        // Team Leader (Member 1)
        fullName: '', email: '', phone: '', college: '',

        event: urlEvent === 'srujan' ? 'Srujan (Hackathon)' :
            urlEvent === 'ankur' ? 'Ankur (Project Expo)' :
                urlEvent === 'uddhav' ? 'Uddhav (Conference)' :
                    urlEvent === 'pursuit' ? 'Pursuit' : 'Srujan (Hackathon)',

        teamName: '',
        teamSize: '',
        accommodation: 'No',

        // Members 2-4
        member2Name: '', member2Email: '', member2Phone: '',
        member3Name: '', member3Email: '', member3Phone: '',
        member4Name: '', member4Email: '', member4Phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Success Modal State
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {
        fullName, email, phone, college, event,
        teamName, teamSize, accommodation,
        member2Name, member2Email, member2Phone,
        member3Name, member3Email, member3Phone,
        member4Name, member4Email, member4Phone,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- GOOGLE FORM CONFIGURATION ---
    const FORM_CONFIG = {
        'Srujan (Hackathon)': {
            url: "https://docs.google.com/forms/d/e/1FAIpQLSckdVMXfOtp8_v4yhbLR9RiGFZEi3axiKZYOlj9tq3V_KJ8ow/formResponse",
            ids: {
                leaderName: "entry.685383898",
                leaderEmail: "entry.209200253",
                leaderPhone: "entry.1577051641",
                college: "entry.1443456513",
                event: "entry.566872537",
                type: "entry.1968381259",
                domain: "entry.1974017458",
                abstract: "entry.705075754" // Used for bundling Team Name, Member Details etc.
            },
            hasCollege: true,
            bundleMembers: true
        },
        'Ankur (Project Expo)': {
            url: "https://docs.google.com/forms/d/e/1FAIpQLSej9oZlDfPMX7eQ0JJvcSIrmdqKZuHkDUS0E0L42kxhEfTpyw/formResponse",
            ids: {
                teamName: "entry.40216783",
                leaderName: "entry.2112252009",
                leaderEmail: "entry.376939330",
                leaderPhone: "entry.1651475776",
                member2Name: "entry.1886708863",
                member2Email: "entry.303258852",
                member2Phone: "entry.1376236348",
                member3Name: "entry.337717641",
                member3Email: "entry.1923504292",
                member3Phone: "entry.2044577159",
                member4Name: "entry.1150982003",
                member4Email: "entry.1575582295",
                member4Phone: "entry.641202700",
                accommodation: "entry.1941174996"
            },
            hasCollege: false,
            bundleMembers: false
        },
        'Uddhav (Conference)': {
            url: "https://docs.google.com/forms/d/e/1FAIpQLScNe95Djx06LVuzumpMYxO2uM7jpHvfkSA3XcIAIDoKdMySSQ/formResponse",
            ids: {
                teamName: "entry.40216783",
                leaderName: "entry.2112252009",
                leaderEmail: "entry.376939330",
                leaderPhone: "entry.1651475776",
                member2Name: "entry.1886708863",
                member2Email: "entry.303258852",
                member2Phone: "entry.1376236348",
                member3Name: "entry.337717641",
                member3Email: "entry.1923504292",
                member3Phone: "entry.2044577159",
                member4Name: "entry.1150982003",
                member4Email: "entry.1575582295",
                member4Phone: "entry.641202700",
                accommodation: "entry.1941174996"
            },
            hasCollege: false,
            bundleMembers: false
        },
        'Pursuit': {
            url: "https://docs.google.com/forms/d/e/1FAIpQLSej9oZlDfPMX7eQ0JJvcSIrmdqKZuHkDUS0E0L42kxhEfTpyw/formResponse", // Placeholder using Ankur's URL
            ids: {
                teamName: "entry.40216783",
                leaderName: "entry.2112252009",
                leaderEmail: "entry.376939330",
                leaderPhone: "entry.1651475776",
                member2Name: "entry.1886708863",
                member2Email: "entry.303258852",
                member2Phone: "entry.1376236348",
                member3Name: "entry.337717641",
                member3Email: "entry.1923504292",
                member3Phone: "entry.2044577159",
                member4Name: "entry.1150982003",
                member4Email: "entry.1575582295",
                member4Phone: "entry.641202700",
                accommodation: "entry.1941174996"
            },
            hasCollege: false,
            bundleMembers: false
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const config = FORM_CONFIG[event];
        if (!config) {
            setError("Invalid event selected.");
            setLoading(false);
            return;
        }

        const formBody = new FormData(); // Renamed from formData to formBody to avoid conflict with state variable

        // --- COMMON FIELDS (Leader) ---
        formBody.append(config.ids.leaderName, fullName);
        formBody.append(config.ids.leaderEmail, email);
        formBody.append(config.ids.leaderPhone, phone);

        if (config.hasCollege) {
            formBody.append(config.ids.college, college);
        }

        if (config.bundleMembers) {
            // --- SRUJAN LOGIC (Bundle everything into "Abstract") ---

            // Srujan-specific extra fields
            formBody.append(config.ids.event, event);
            formBody.append(config.ids.type, "Team Registration");
            formBody.append(config.ids.domain, "N/A");

            // Bundle Members & Details
            let detailedInfo = `--- TEAM REGISTRATION ---`;
            detailedInfo += `\nTeam Name: ${teamName}`;
            detailedInfo += `\nTeam Size: ${teamSize}`;
            detailedInfo += `\nAccommodation: ${accommodation}`;
            detailedInfo += `\n\nMember 2: ${member2Name}, ${member2Email}, ${member2Phone}`;
            if (parseInt(teamSize) >= 3) detailedInfo += `\nMember 3: ${member3Name}, ${member3Email}, ${member3Phone}`;
            if (parseInt(teamSize) >= 4) detailedInfo += `\nMember 4: ${member4Name}, ${member4Email}, ${member4Phone}`;

            formBody.append(config.ids.abstract, detailedInfo);

        } else {
            // --- ANKUR / UDDHAV LOGIC (Direct Field Mapping) ---
            formBody.append(config.ids.teamName, teamName);
            formBody.append(config.ids.leaderName, fullName);
            formBody.append(config.ids.leaderEmail, email);
            formBody.append(config.ids.leaderPhone, phone);

            // Member 2 (Required)
            formBody.append(config.ids.member2Name, member2Name);
            formBody.append(config.ids.member2Email, member2Email);
            formBody.append(config.ids.member2Phone, member2Phone);

            // Member 3 (Optional in UI, but check if required in Form)
            // If empty, submit empty string
            if (parseInt(teamSize) >= 3) {
                formBody.append(config.ids.member3Name, member3Name);
                formBody.append(config.ids.member3Email, member3Email);
                formBody.append(config.ids.member3Phone, member3Phone);
            }

            // Member 4
            if (parseInt(teamSize) >= 4) {
                formBody.append(config.ids.member4Name, member4Name);
                formBody.append(config.ids.member4Email, member4Email);
                formBody.append(config.ids.member4Phone, member4Phone);
            }

            // Ensure Accommodation is "YES"/"NO" (Uppercase) for these forms
            formBody.append(config.ids.accommodation, accommodation.toUpperCase());
        }

        try {
            await fetch(config.url, {
                method: 'POST',
                mode: 'no-cors',
                body: formBody
            });

            setShowSuccessModal(true); // Changed from setSuccessModal to setShowSuccessModal
            setLoading(false);

            // Reset fields
            setFormData(prev => ({
                ...prev,
                teamName: '', teamSize: '', accommodation: 'No',
                member2Name: '', member2Email: '', member2Phone: '',
                member3Name: '', member3Email: '', member3Phone: '',
                member4Name: '', member4Email: '', member4Phone: ''
            }));

        } catch (err) {
            console.error(err);
            setError('Submission failed. Please try again.');
            setLoading(false);
        }
    };

    // --- RENDER HELPERS ---
    const config = FORM_CONFIG[event];
    const isTeamEvent = true; // All three are team events now
    const showCollege = config?.hasCollege;

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        navigate('/'); // Redirect after closing
    };

    return (
        <div className="register-container">
            {/* SUCCESS MODAL */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content-wrapper">
                        {/* Close button top right */}
                        <button className="modal-close-btn" onClick={closeSuccessModal}>
                            <FaTimes />
                        </button>

                        <div className="register-content-modal">
                            <h2 className="success-title">Thank You!</h2>
                            <p className="success-body">
                                You have successfully registered for <br />
                                <span className="success-highlight">{event}</span>
                            </p>

                            <p className="success-slogan">
                                "Innovate today to define tomorrow."
                            </p>

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

            <div className="register-content">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: '#a78bfa',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        zIndex: 10
                    }}
                >
                    <FaArrowLeft /> Back
                </button>

                <div className="register-header">
                    <p>{event} Registration</p>
                </div>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <form className="register-form" onSubmit={onSubmit}>

                    <label>EVENT</label>
                    <select name="event" value={event} onChange={onChange} className="register-select" required disabled>
                        <option value="Srujan (Hackathon)">Srujan (Hackathon)</option>
                        <option value="Ankur (Project Expo)">Ankur (Project Expo)</option>
                        <option value="Uddhav (Conference)">Uddhav (Conference)</option>
                        <option value="Pursuit">Pursuit</option>
                    </select>

                    {/* TEAM INFO SECTION (Visible for all) */}
                    <div className="form-section-title">Team Info</div>
                    <label>TEAM NAME</label>
                    <input type="text" placeholder="Enter Team Name" name="teamName" value={teamName} onChange={onChange} required />

                    <label>ACCOMMODATION REQUIRED?</label>
                    <select name="accommodation" value={accommodation} onChange={onChange} className="register-select" required>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    <label>TEAM SIZE (2-4)</label>
                    <input
                        type="number"
                        min="1"
                        max="4"
                        placeholder="Total Members (e.g. 4)"
                        name="teamSize"
                        value={teamSize}
                        onChange={onChange}
                        required
                    />

                    {/* TEAM LEADER */}
                    <div className="form-section-title">Team Leader (Member 1) Details</div>
                    <label>FULL NAME</label>
                    <input type="text" placeholder="Leader Name" name="fullName" value={fullName} onChange={onChange} required />

                    <label>EMAIL</label>
                    <input type="email" placeholder="Leader Email" name="email" value={email} onChange={onChange} required />

                    <label>PHONE</label>
                    <input type="tel" placeholder="Leader Phone" name="phone" value={phone} onChange={onChange} required />

                    {showCollege && (
                        <>
                            <label>COLLEGE</label>
                            <input type="text" placeholder="College Name" name="college" value={college} onChange={onChange} required />
                        </>
                    )}


                    {/* DYNAMIC MEMBERS */}
                    {parseInt(teamSize) >= 2 && (
                        <>
                            <div className="form-section-title">Member 2 Details</div>
                            <label>NAME</label>
                            <input type="text" placeholder="Member 2 Name" name="member2Name" value={member2Name} onChange={onChange} required />
                            <label>EMAIL</label>
                            <input type="email" placeholder="Member 2 Email" name="member2Email" value={member2Email} onChange={onChange} required />
                            <label>PHONE</label>
                            <input type="tel" placeholder="Member 2 Phone" name="member2Phone" value={member2Phone} onChange={onChange} required />
                        </>
                    )}

                    {parseInt(teamSize) >= 3 && (
                        <>
                            <div className="form-section-title">Member 3 Details</div>
                            <label>NAME</label>
                            <input type="text" placeholder="Member 3 Name" name="member3Name" value={member3Name} onChange={onChange} required />
                            <label>EMAIL</label>
                            <input type="email" placeholder="Member 3 Email" name="member3Email" value={member3Email} onChange={onChange} required />
                            <label>PHONE</label>
                            <input type="tel" placeholder="Member 3 Phone" name="member3Phone" value={member3Phone} onChange={onChange} required />
                        </>
                    )}

                    {parseInt(teamSize) >= 4 && (
                        <>
                            <div className="form-section-title">Member 4 Details</div>
                            <label>NAME</label>
                            <input type="text" placeholder="Member 4 Name" name="member4Name" value={member4Name} onChange={onChange} required />
                            <label>EMAIL</label>
                            <input type="email" placeholder="Member 4 Email" name="member4Email" value={member4Email} onChange={onChange} required />
                            <label>PHONE</label>
                            <input type="tel" placeholder="Member 4 Phone" name="member4Phone" value={member4Phone} onChange={onChange} required />
                        </>
                    )}

                    <button type="submit" className="register-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Register Team'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Register;
