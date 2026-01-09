import React, { useState } from 'react';
import '../Styles/campusMap.css';
import campusMapImg from '../assets/campus_map_v3.png';
import { FaMapMarkerAlt } from "react-icons/fa";

const locations = [
    {
        id: 'hackathon',
        name: 'Hackathon Venue',
        markers: [{ top: '65%', left: '35%', label: 'Gymnasium' }]
    },
    {
        id: 'projectexpo',
        name: 'Project Expo Venue',
        markers: [{ top: '70%', left: '25%', label: 'Auditorium' }]
    },
    {
        id: 'conference',
        name: 'Conference Venue',
        markers: [{ top: '55%', left: '43%', label: 'Vidya Bhawan' }]
    },
    {
        id: 'food',
        name: 'Food Court',
        markers: [{ top: '87%', left: '76%', label: 'Canteen' }]
    },
    {
        id: 'accommodation',
        name: 'Accommodation',
        markers: [
            { top: '42%', left: '70%', label: 'Girls Hostels' },
            { top: '78%', left: '72%', label: 'Boys Hostels' }
        ]
    },
];

const CampusMap = () => {
    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <section className="campus-map-section">
            <h2 className="section-title">Campus Map</h2>

            <div className="map-content">
                <div className="map-sidebar">
                    <h3>Explore Venues</h3>
                    <p className="map-instruction">Click on a venue to locate it on the map.</p>

                    <div className="location-buttons">
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                className={`map-btn ${activeLocation === loc.id ? 'active' : ''}`}
                                onClick={() => setActiveLocation(loc.id)}
                            >
                                {loc.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="map-display">
                    <div className="map-wrapper">
                        <img src={campusMapImg} alt="SSGMCE Campus Map" className="map-image" />

                        {locations.map((loc) => (
                            loc.markers.map((marker, index) => (
                                <div
                                    key={`${loc.id}-${index}`}
                                    className={`map-marker ${activeLocation === loc.id ? 'active' : ''}`}
                                    style={{ top: marker.top, left: marker.left }}
                                >
                                    <div className="marker-pin">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div className="marker-label">{marker.label}</div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampusMap;
