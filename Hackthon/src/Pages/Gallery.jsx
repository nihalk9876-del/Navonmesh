import React from 'react';
import '../Styles/gallery.css';
import gallery1 from '../assets/gallery1.png';
import gallery2 from '../assets/gallery2.png';
import gallery3 from '../assets/gallery3.png';
import gallery4 from '../assets/gallery4.png';
import gallery5 from '../assets/gallery5.png';
import gallery6 from '../assets/gallery6.png';
import gallery7 from '../assets/gallery7.png';
import gallery8 from '../assets/gallery8.png';

const Gallery = () => {
    // Placeholder images for background scrolling
    const images = [
        gallery1, gallery2, gallery3, gallery4,
        gallery5, gallery6, gallery7, gallery8
    ];

    // Create unique shuffled orders for each row
    const row1Images = [...images, ...images, ...images];
    const row2Images = [...images.slice().reverse(), ...images.slice().reverse(), ...images.slice().reverse()];
    const row3Images = [...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5], ...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5], ...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5]];

    // Video Sources
    const video1 = "https://www.youtube.com/embed/08fySatSc2c?si=nZq1_yA3_J7vLBim";
    const video2 = "https://www.youtube.com/embed/08fySatSc2c?si=nZq1_yA3_J7vLBim";
    const video3 = "https://www.youtube.com/embed/08fySatSc2c?si=nZq1_yA3_J7vLBim";

    return (
        <div className="gallery-page">
            <h1 className="gallery-title">Gallery</h1>

            {/* Row 1: Left Overlay */}
            <div className="gallery-row">
                {/* Scrolling Background */}
                <div className="marquee-layer">
                    <div className="marquee-track">
                        {row1Images.map((src, index) => (
                            <div className="marquee-item" key={`r1-${index}`}>
                                <img src={src} alt="Gallery Item" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stable Overlay - Left */}
                <div className="video-overlay overlay-left">
                    <div className="overlay-video-container">
                        <iframe
                            src={video1}
                            title="Video 1"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Row 2: Center Overlay */}
            <div className="gallery-row">
                <div className="marquee-layer">
                    <div className="marquee-track">
                        {row2Images.map((src, index) => (
                            <div className="marquee-item" key={`r2-${index}`}>
                                <img src={src} alt="Gallery Item" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stable Overlay - Center */}
                <div className="video-overlay overlay-center">
                    <div className="overlay-video-container">
                        <iframe
                            src={video2}
                            title="Video 2"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Row 3: Right Overlay */}
            <div className="gallery-row">
                <div className="marquee-layer">
                    <div className="marquee-track">
                        {row3Images.map((src, index) => (
                            <div className="marquee-item" key={`r3-${index}`}>
                                <img src={src} alt="Gallery Item" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stable Overlay - Right */}
                <div className="video-overlay overlay-right">
                    <div className="overlay-video-container">
                        <iframe
                            src={video3}
                            title="Video 3"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Gallery;
