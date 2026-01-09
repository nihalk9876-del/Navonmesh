import React from 'react';
import '../Styles/register.css';
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-content">
                <div className="register-header">
                    <p>Be part of the innovation. Create your account to get started.</p>
                </div>

                <form className="register-form">
                    <label>FULL NAME</label>
                    <input type="text" placeholder="Your name" />

                    <label>EMAIL</label>
                    <input type="email" placeholder="your.email@example.com" />

                    <label>PASSWORD</label>
                    <input type="password" placeholder="Create a strong password" />

                    <button type="submit" className="register-btn">Register</button>

                    <button type="button" className="google-btn">
                        <FaGoogle style={{ marginRight: '10px' }} /> Register with Google
                    </button>
                </form>

                <p className="login-link">
                    Already registered? <Link to="/login">Login to continue.</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
