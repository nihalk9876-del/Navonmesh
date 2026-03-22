import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/podcast.css';
import { FaPlay, FaMicrophone, FaHeadphones, FaSpotify, FaYoutube } from 'react-icons/fa';
import podcastThumb from '../assets/podcast_thumbnail.jpg';

const Podcast = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const navigate = useNavigate();
    const playerRef = useRef(null);

    // YouTube IFrame API initialization
    useEffect(() => {
        if (!isPlaying) return;

        // Load the API script if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        const createPlayer = () => {
            playerRef.current = new window.YT.Player('podcast-video', {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        const onPlayerStateChange = (event) => {
            // YT.PlayerState.ENDED is 0
            if (event.data === 0) {
                setVideoEnded(true);
            }
        };

        // If API is already loaded, initialize after a small delay to ensure iframe is rendered
        if (window.YT && window.YT.Player) {
            setTimeout(createPlayer, 100);
        } else {
            window.onYouTubeIframeAPIReady = () => {
                createPlayer();
            };
        }
    }, [isPlaying]);

    const handlePlayAgain = () => {
        setVideoEnded(false);
        if (playerRef.current && playerRef.current.playVideo) {
            playerRef.current.playVideo();
        }
    };

    return (
        <section className="podcast-section" id="podcast">
            <div className="podcast-container">
                <div className="podcast-header">
                    <div className="podcast-badge">
                        <FaMicrophone className="mic-icon" />
                        <span>EVENT INSIGHTS</span>
                        <div className="live-indicator">
                            <span className="dot"></span>
                            PREVIEW
                        </div>
                    </div>
                    <h2 className="podcast-title">Insights from <span className="highlight">Committee Heads</span></h2>
                    <p className="podcast-desc">
                        Get exclusive information about the event quadrants, rules, and expectations directly
                        from the leaders driving Navonmesh 2026.
                    </p>
                </div>

                <div className="podcast-content-layout">
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
                                {!isPlaying ? (
                                    <div className="podcast-poster" onClick={() => setIsPlaying(true)}>
                                        <img src={podcastThumb} alt="Podcast Preview" className="poster-img" />
                                        <div className="play-overlay">
                                            <div className="play-circle">
                                                <FaPlay className="play-icon" />
                                            </div>
                                            <span>Play Episode</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="video-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                        <iframe
                                            id="podcast-video"
                                            className="podcast-iframe"
                                            src="https://www.youtube.com/embed/1KSBr2NC3xY?autoplay=1&rel=0&enablejsapi=1"
                                            title="Navonmesh Podcast"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>

                                        {/* End Screen Overlay */}
                                        {videoEnded && (
                                            <div className="podcast-video-end-screen">
                                                <div className="end-screen-content">
                                                    <h3>Thank you for watching!</h3>
                                                    <button className="play-again-btn" onClick={handlePlayAgain}>
                                                        <FaPlay /> Play Again
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="podcast-controls">
                                <div className="now-playing">
                                    <FaHeadphones className="headphone-icon" />
                                    <div className="track-info">
                                        <span className="track-name">Navonmesh 2026: Innovation & Beyond</span>
                                        <span className="track-host">Hosted by Overall Heads</span>
                                    </div>
                                </div>
                                <div className="platform-links">
                                    <a href="https://www.youtube.com/@MESIMCC" target="_blank" rel="noopener noreferrer" className="platform-btn youtube"><FaYoutube /> YouTube</a>
                                    <a href="#" className="platform-btn spotify"><FaSpotify /> Spotify</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Panel (Right Side) */}
                    <div className="podcast-nav-panel">
                        <h3 className="nav-title">ERROR 404 SYSTEMS</h3>
                        <div className="nav-buttons">
                            <button onClick={() => navigate('/hackathon')} className="nav-btn">
                                <span>&gt; </span> ABOUT HACKATHON
                            </button>
                            <button onClick={() => navigate('/projectexpo')} className="nav-btn">
                                <span>&gt; </span> NAT. PROJECT EXPO
                            </button>
                            <button onClick={() => navigate('/conference')} className="nav-btn">
                                <span>&gt; </span> NAT. CONFERENCE
                            </button>
                            <button onClick={() => navigate('/accommodation')} className="nav-btn">
                                <span>&gt; </span> ACCOMMODATION
                            </button>
                            <button onClick={() => navigate('/register')} className="nav-btn highlight">
                                <span>&gt; </span> REGISTER NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Podcast;
