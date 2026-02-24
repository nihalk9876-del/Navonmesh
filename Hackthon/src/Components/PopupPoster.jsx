import React from 'react';
import '../Styles/popupPoster.css';
import { IoClose } from 'react-icons/io5';

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
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Main Mission Brief"
                        className="poster-image"
                    />
                    <div className="poster-overlay">
                        <div className="poster-intel">
                            <span className="intel-tag">NAVONMESH_2026</span>
                            <h2 className="intel-title">MAIN MISSION BRIEF</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupPoster;
