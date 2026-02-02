import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "../Styles/eventShowcase.css";
import e1 from "../assets/events/e1.png";
import e2 from "../assets/events/e2.png";
import e3 from "../assets/events/e3.png";
import e4 from "../assets/events/pursuit.png";

const events = [
  {
    title: "सृजन",
    text: "A celebration of innovation, teamwork, and the power of collective creativity. Build solutions overnight and win amazing prizes.",
    image: e1,
    side: "left",
    id: "hackathon", // Use ID for scrolling
    registerParam: "srujan"
  },
  {
    title: "अंकुर",
    text: "ANKUR - National Level Project Expo is a national platform for students to present innovative projects and working models, fostering creativity, practical learning, and technical excellence..",
    image: e2,
    side: "right",
    id: "projectexpo",
    registerParam: "ankur"
  },
  {
    title: "उद्भव",
    text: "An electrifying cultural night where talent meets celebration. Experience unforgettable moments.",
    image: e3,
    side: "left",
    id: "conference",
    registerParam: "uddhav"
  },
  {
    title: "PURSUIT",
    text: "PURSUIT is the theme-based national level technical symposium. It is a grand stage where innovation meets competition, featuring various technical events and challenges.",
    image: e4,
    side: "right",
    id: "pursuit",
    registerParam: "pursuit"
  },
];

const EventShowcase = () => {
  const navigate = useNavigate();
  const [launchingId, setLaunchingId] = useState(null);

  const handleLaunch = (index, param) => {
    setLaunchingId(index);
    // Wait for animation to finish before navigating
    setTimeout(() => {
      navigate(`/register?event=${param}`);
      setLaunchingId(null); // Reset if they come back
    }, 800);
  };

  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the item is visible
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="event-showcase">
      {events.map((ev, i) => (
        <div
          key={i}
          className={`timeline-item ${ev.side}`}
          ref={(el) => (itemRefs.current[i] = el)}
        >
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
                onClick={() => handleLaunch(i, ev.registerParam)}
              >
                <span className="reg-text">Register Now</span>
                <div className="reg-icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
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
            <div className="event-glass-card">
              <p className="event-desc">{ev.text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventShowcase;
