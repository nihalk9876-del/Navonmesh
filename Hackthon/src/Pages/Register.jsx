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
        // Redirect handled externally if needed, but now pursuit has its own landing page
        if (urlEvent === 'srijan') {
            setFormData(prev => ({ ...prev, teamSize: '4' }));
        }
    }, [urlEvent]);


    const [formData, setFormData] = useState({
        // Team Leader (Member 1)
        fullName: '', email: '', phone: '', college: '',

        event: urlEvent === 'srijan' ? 'Srijan (Hackathon)' :
            urlEvent === 'ankur' ? 'Ankur (Project Expo)' :
                urlEvent === 'udbhav' ? 'Udbhav (Conference)' :
                    urlEvent === 'pursuit' ? 'Pursuit' : 'Udbhav (Conference)',

        teamName: '',
        teamSize: urlEvent === 'srijan' ? '4' : '',

        // Members 2-4
        member2Name: '', member2Email: '', member2Phone: '',
        member3Name: '', member3Email: '', member3Phone: '',
        member4Name: '', member4Email: '', member4Phone: '',
        agreed: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Success Modal State
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {
        fullName, email, phone, college, event,
        teamName, teamSize,
        member2Name, member2Email, member2Phone,
        member3Name, member3Email, member3Phone,
        member4Name, member4Email, member4Phone,
    } = formData;

    const onChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // --- GOOGLE FORM CONFIGURATION ---
    const FORM_CONFIG = {
        'Srijan (Hackathon)': {
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfMpbvgeNfFKXVrTLL4ug41aUpE7YDneNNQv4_IfmkyPTlQ-Q/formResponse",
            ids: {
                teamName: "entry.2005620554",
                leaderName: "entry.1045781291",
                leaderEmail: "entry.1065046570",
                leaderPhone: "entry.1166974658",
                member2Name: "entry.1446904082",
                member2Email: "entry.282203664",
                member2Phone: "entry.1059585569",
                member3Name: "entry.1158408763",
                member3Email: "entry.194510035",
                member3Phone: "entry.1200228325",
                member4Name: "entry.1710049001",
                member4Email: "entry.921494192",
                member4Phone: "entry.1681717638",
                college: "entry.323039862"
            },
            hasCollege: true,
            hasMemberPhone: true,
            hasAccommodation: false,
            bundleMembers: false
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
                member4Phone: "entry.641202700"
            },
            hasCollege: false,
            hasMemberPhone: true,
            hasAccommodation: false,
            bundleMembers: false
        },
        'Udbhav (Conference)': {
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
                member4Phone: "entry.641202700"
            },
            hasCollege: false,
            hasMemberPhone: true,
            hasAccommodation: false,
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
                member4Phone: "entry.641202700"
            },
            hasCollege: false,
            hasMemberPhone: true,
            hasAccommodation: false,
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

        const formBody = new FormData();

        // --- COMMON FIELDS ---
        if (config.ids.teamName) formBody.append(config.ids.teamName, formData.teamName);
        if (config.ids.leaderName) formBody.append(config.ids.leaderName, formData.fullName);
        if (config.ids.leaderEmail) formBody.append(config.ids.leaderEmail, formData.email);
        if (config.ids.leaderPhone) formBody.append(config.ids.leaderPhone, formData.phone);
        if (config.ids.college && config.hasCollege) formBody.append(config.ids.college, formData.college);

        if (config.bundleMembers) {
            // Srijan legacy logic (if needed, but currently false for all)
            formBody.append(config.ids.event, event);
            formBody.append(config.ids.type, "Team Registration");
            formBody.append(config.ids.domain, "N/A");

            let detailedInfo = `--- TEAM REGISTRATION ---`;
            detailedInfo += `\nTeam Name: ${teamName}`;
            detailedInfo += `\nTeam Size: ${teamSize}`;
            detailedInfo += `\n\nMember 2: ${member2Name}, ${member2Email}`;
            if (parseInt(teamSize) >= 3) detailedInfo += `\nMember 3: ${member3Name}, ${member3Email}`;
            if (parseInt(teamSize) >= 4) detailedInfo += `\nMember 4: ${member4Name}, ${member4Email}`;

            formBody.append(config.ids.abstract, detailedInfo);
        } else {
            // Member 2
            if (config.ids.member2Name) formBody.append(config.ids.member2Name, formData.member2Name);
            if (config.ids.member2Email) formBody.append(config.ids.member2Email, formData.member2Email);
            if (config.ids.member2Phone && config.hasMemberPhone) formBody.append(config.ids.member2Phone, formData.member2Phone);

            // Member 3
            if (parseInt(formData.teamSize) >= 3) {
                if (config.ids.member3Name) formBody.append(config.ids.member3Name, formData.member3Name);
                if (config.ids.member3Email) formBody.append(config.ids.member3Email, formData.member3Email);
                if (config.ids.member3Phone && config.hasMemberPhone) formBody.append(config.ids.member3Phone, formData.member3Phone);
            }

            // Member 4
            if (parseInt(formData.teamSize) >= 4) {
                if (config.ids.member4Name) formBody.append(config.ids.member4Name, formData.member4Name);
                if (config.ids.member4Email) formBody.append(config.ids.member4Email, formData.member4Email);
                if (config.ids.member4Phone && config.hasMemberPhone) formBody.append(config.ids.member4Phone, formData.member4Phone);
            }
        }

        try {
            await fetch(config.url, {
                method: 'POST',
                mode: 'no-cors',
                body: formBody
            });

            setShowSuccessModal(true);
            setLoading(false);

            // Reset fields
            setFormData(prev => ({
                ...prev,
                teamName: '', teamSize: '',
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
                            <h2 className="success-title">Success!</h2>
                            <p className="success-body">
                                You have successfully registered for <span className="success-highlight">{event}</span>.
                            </p>

                            <div className="success-info-box">
                                <div className="info-item">
                                    <span className="info-icon">📧</span>
                                    <p>Check the <strong>Team Leader's mailbox</strong> (including spam) for confirmation.</p>
                                </div>
                                <div className="info-item">
                                    <span className="info-icon">📲</span>
                                    <p>Join our WhatsApp group and channels for all future updates.</p>
                                </div>
                            </div>

                            <a
                                href="https://whatsapp.com/channel/0029VbCVzgbBlHpY1prIRI1m"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                            >
                                <FaWhatsapp className="whatsapp-icon" /> Join WhatsApp Group
                            </a>

                            <div className="success-contact-section">
                                <p className="contact-heading">For any queries, contact:</p>
                                <div className="contact-grid">
                                    <div className="contact-item">
                                        <p className="c-name">Nihal Kankal</p>
                                        <p className="c-role">(Overall Head)</p>
                                        <p className="c-num">+91 8766417815</p>
                                    </div>
                                    <div className="contact-item">
                                        <p className="c-name">Prarthna Kale</p>
                                        <p className="c-role">(Overall Head)</p>
                                        <p className="c-num">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="register-layout">
                <div className="register-content">
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft /> Back
                    </button>


                    <div className="register-header">
                        <p>{event} Registration</p>
                    </div>

                    <div className="register-highlights-grid">
                        <div className="highlight-box">
                            <h4>FACILITIES</h4>
                            <p>Ethernet • WiFi • Extension Boards • Accomodation</p>
                        </div>
                        <div className="highlight-box">
                            <h4>REWARDS</h4>
                            <p>Certificates • Exposure • Networking • Recognition</p>
                        </div>
                    </div>

                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                    <form className="register-form" onSubmit={onSubmit}>

                        <label>EVENT</label>
                        <select name="event" value={event} onChange={onChange} className="register-select" required disabled>
                            <option value="Srijan (Hackathon)">Srijan (Hackathon)</option>
                            <option value="Ankur (Project Expo)">Ankur (Project Expo)</option>
                            <option value="Udbhav (Conference)">Udbhav (Conference)</option>
                            <option value="Pursuit">Pursuit</option>
                        </select>

                        {/* TEAM INFO SECTION (Visible for all) */}
                        <div className="form-section-title">Team Info</div>
                        <label>TEAM NAME</label>
                        <input type="text" placeholder="Enter Team Name" name="teamName" value={teamName} onChange={onChange} required />

                        <label>TEAM SIZE (2-4)</label>
                        <input
                            type="number"
                            min={event === 'Srijan (Hackathon)' ? "4" : "2"}
                            max="4"
                            placeholder="Total Members (e.g. 4)"
                            name="teamSize"
                            value={event === 'Srijan (Hackathon)' ? "4" : teamSize}
                            onChange={onChange}
                            required
                            readOnly={event === 'Srijan (Hackathon)'}
                            style={event === 'Srijan (Hackathon)' ? { backgroundColor: '#e9ecef', cursor: 'not-allowed' } : {}}
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
                                {config?.hasMemberPhone && (
                                    <>
                                        <label>PHONE</label>
                                        <input type="tel" placeholder="Member 2 Phone" name="member2Phone" value={member2Phone} onChange={onChange} required />
                                    </>
                                )}
                            </>
                        )}

                        {parseInt(teamSize) >= 3 && (
                            <>
                                <div className="form-section-title">Member 3 Details</div>
                                <label>NAME</label>
                                <input type="text" placeholder="Member 3 Name" name="member3Name" value={member3Name} onChange={onChange} required />
                                <label>EMAIL</label>
                                <input type="email" placeholder="Member 3 Email" name="member3Email" value={member3Email} onChange={onChange} required />
                                {config?.hasMemberPhone && (
                                    <>
                                        <label>PHONE</label>
                                        <input type="tel" placeholder="Member 3 Phone" name="member3Phone" value={member3Phone} onChange={onChange} required />
                                    </>
                                )}
                            </>
                        )}

                        {parseInt(teamSize) >= 4 && (
                            <>
                                <div className="form-section-title">Member 4 Details</div>
                                <label>NAME</label>
                                <input type="text" placeholder="Member 4 Name" name="member4Name" value={member4Name} onChange={onChange} required />
                                <label>EMAIL</label>
                                <input type="email" placeholder="Member 4 Email" name="member4Email" value={member4Email} onChange={onChange} required />
                                {config?.hasMemberPhone && (
                                    <>
                                        <label>PHONE</label>
                                        <input type="tel" placeholder="Member 4 Phone" name="member4Phone" value={member4Phone} onChange={onChange} required />
                                    </>
                                )}
                            </>
                        )}

                        <div className="terms-container">
                            <input
                                type="checkbox"
                                name="agreed"
                                checked={formData.agreed}
                                onChange={onChange}
                                required
                                className="terms-checkbox"
                            />
                            <div className="terms-text-wrapper">
                                I agree to the <span className="terms-link">Terms and Conditions</span>
                            </div>
                        </div>



                        <div className="accommodation-notice-box">
                            <p className="notice-text">
                                <span className="notice-icon">🚀</span>
                                <strong>NOTICE:</strong> For accommodation, please fill the <Link to="/accommodation" className="notice-link">Accommodation Form</Link> separately on the website.
                            </p>
                        </div>

                        <button type="submit" className="register-btn" disabled={loading || !formData.agreed}>
                            {loading ? 'Submitting...' : 'Register Team'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
