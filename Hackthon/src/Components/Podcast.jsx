import React from 'react';
import '../Styles/podcast.css';
import { FaPlay, FaMicrophone, FaHeadphones, FaSpotify, FaYoutube } from 'react-icons/fa';

const Podcast = () => {
    return (
        <section className="podcast-section" id="podcast">
            <div className="podcast-container">
                <div className="podcast-header">
                    <div className="podcast-badge">
                        <FaMicrophone className="mic-icon" />
                        <span>EVENT INSIGHTS</span>
                        <div className="live-indicator">
                            <span className="dot"></span>
                            LIVE
                        </div>
                    </div>
                    <h2 className="podcast-title">Insights from <span className="highlight">Committee Heads</span></h2>
                    <p className="podcast-desc">
                        Get exclusive information about the event quadrants, rules, and expectations directly
                        from the leaders driving Navonmesh 2026.
                    </p>
                </div>

                <div className="podcast-window-wrapper">
                    <div className="podcast-glass-window">
                        <div className="podcast-visualizer">
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                        </div>

                        <div className="podcast-video-container">
                            {/* Replace with your podcast video URL */}
                            <iframe
                                className="podcast-iframe"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
                                title="Navonmesh Podcast"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="podcast-controls">
                            <div className="now-playing">
                                <FaHeadphones className="headphone-icon" />
                                <div className="track-info">
                                    <span className="track-name">The Future of Tech in 2026</span>
                                    <span className="track-host">Hosted by Team Navonmesh</span>
                                </div>
                            </div>
                            <div className="platform-links">
                                <a href="#" className="platform-btn youtube"><FaYoutube /> YouTube</a>
                                <a href="#" className="platform-btn spotify"><FaSpotify /> Spotify</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Podcast;
