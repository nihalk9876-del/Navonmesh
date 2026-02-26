import React from 'react';
import '../Styles/popupPoster.css';
import { IoClose } from 'react-icons/io5';
import popupImg from '../assets/popup.png';

const PopupPoster = ({ onClose }) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close-btn" onClick={onClose}>
                    <IoClose />
                </button>
                <div className="popup-content">
                    <div className="tech-scan-line"></div>
                    <img
                        src={popupImg}
                        alt="Main Mission Brief"
                        className="poster-image"
                    />
                    <div className="poster-overlay">
                        <div className="poster-intel">
                            <span className="intel-tag">NAVONMESH_2026</span>
                            <h2 className="intel-title">WORKSHOPS & SESSIONS</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default PopupPoster;
