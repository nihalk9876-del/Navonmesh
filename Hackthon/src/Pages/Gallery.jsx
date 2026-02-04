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
    const [isVisible, setIsVisible] = React.useState(false);
    const galleryRef = React.useRef(null);

    // Placeholder images for background scrolling
    const images = [
        gallery1, gallery2, gallery3, gallery4,
        gallery5, gallery6, gallery7, gallery8
    ];

    // Intersection Observer to detect when gallery is in view
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 } // Play when 30% of gallery is visible
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }
        };
    }, []);

    // Create unique shuffled orders for each row
    const row1Images = [...images, ...images, ...images];
    const row2Images = [...images.slice().reverse(), ...images.slice().reverse(), ...images.slice().reverse()];
    const row3Images = [...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5], ...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5], ...[gallery4, gallery1, gallery7, gallery2, gallery8, gallery3, gallery6, gallery5]];

    // Video Sources
    // Add autoplay and mute params when visible. Mute is required by browsers for autoplay to work.
    const baseVideoUrl = "https://www.youtube.com/embed/08fySatSc2c?si=nZq1_yA3_J7vLBim";
    const autoPlayUrl = `${baseVideoUrl}&autoplay=1&mute=1`;

    return (
        <div className="gallery-page" ref={galleryRef}>
            <h1 className="gallery-title">Gallery</h1>

            {/* Row 1 */}
            <div className="gallery-row">
                <div className="marquee-layer">
                    <div className="marquee-track">
                        {row1Images.map((src, index) => (
                            <div className="marquee-item" key={`r1-${index}`}>
                                <img src={src} alt="Gallery Item" />
                            </div>
                        ))}
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
                            src={isVisible ? autoPlayUrl : baseVideoUrl}
                            title="Gallery Feature Video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Row 3 */}
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
            </div>

        </div>
    );
};

export default Gallery;
