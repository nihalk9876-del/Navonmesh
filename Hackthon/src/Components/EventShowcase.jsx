import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../styles/eventShowcase.css";
import e1 from "../assets/events/e1.png";
import e2 from "../assets/events/e2.png";
import e3 from "../assets/events/e3.png";

const events = [
  {
    title: "सृजन",
    text: "A celebration of innovation, teamwork, and the power of collective creativity. Build solutions overnight and win amazing prizes.",
    image: e1,
    side: "left",
    id: "hackathon", // Use ID for scrolling
  },
  {
    title: "अंकुर",
    text: "ANKUR - National Level Project Expo is a national platform for students to present innovative projects and working models, fostering creativity, practical learning, and technical excellence..",
    image: e2,
    side: "right",
    id: "projectexpo",
  },
  {
    title: "अंकुर",
    text: "An electrifying cultural night where talent meets celebration. Experience unforgettable moments.",
    image: e3,
    side: "left",
    id: "conference",
  },
];

const EventShowcase = () => {
  const navigate = useNavigate();
  const [launchingId, setLaunchingId] = useState(null);

  const handleLaunch = (index, path) => {
    setLaunchingId(index);
    // Wait for animation to finish before navigating
    setTimeout(() => {
      navigate(path);
      setLaunchingId(null); // Reset if they come back
    }, 800);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="event-showcase">
      {events.map((ev, i) => (
        <div key={i} className={`timeline-item ${ev.side}`}>
          {/* Image Column */}
          <div className="timeline-img-col">
            <div
              className="img-glow-container"
              onClick={() => scrollToSection(ev.id)} /* Click to Scroll */
              style={{ cursor: "pointer" }}
            >
              <img src={ev.image} alt={ev.title} />
            </div>
            <div className="event-title-group">
              <h3 className="event-title-hindi">{ev.title}</h3>

              {/* Rocket Register Button */}
              <div
                className={`register-rocket-btn ${launchingId === i ? "launching" : ""}`}
                onClick={() => handleLaunch(i, "/register")}
              >
                <span>Register Now</span>
                <div className="rocket-exhaust"></div>
              </div>

            </div>
          </div>

          {/* Divider Column (with line) */}
          <div className="timeline-divider">
            <div className="dot top-dot"></div>
            <div className="vertical-line"></div>
            <div className="dot bottom-dot"></div>
          </div>

          {/* Text Column */}
          <div className="timeline-text-col">
            <p className="event-desc">{ev.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventShowcase;
