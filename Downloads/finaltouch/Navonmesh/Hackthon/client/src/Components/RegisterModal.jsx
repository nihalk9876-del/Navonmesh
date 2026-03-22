import React from 'react';
import '../Styles/register.css';
import { FaGoogle, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

const RegisterModal = ({ onClose }) => {
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="register-content-modal">
                    {submitted ? (
                        <div className="success-message">
                            <h2>Thank You!</h2>
                            <p>All the Best for the Event!</p>
                            <button className="register-btn" onClick={onClose}>Close</button>
                        </div>
                    ) : (
                        <>
                            <div className="register-header">
                                <p style={{ marginTop: 0 }}>Create your account</p>
                            </div>

                            <form className="register-form" onSubmit={handleSubmit}>
                                <label>FULL NAME</label>
                                <input type="text" placeholder="Your name" required />

                                <label>EMAIL</label>
                                <input type="email" placeholder="your.email@example.com" required />

                                <label>PASSWORD</label>
                                <input type="password" placeholder="Create a strong password" required />

                                <button type="submit" className="register-btn">Register</button>

                                <button type="button" className="google-btn">
                                    <FaGoogle style={{ marginRight: '10px' }} /> Register with Google
                                </button>
                            </form>

                            <p className="login-link">
                                Already registered? <Link to="/login" onClick={onClose}>Login</Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
