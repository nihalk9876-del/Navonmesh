import React, { useEffect, useState } from "react";
import "../Styles/hero.css";
import PursuitName from "../assets/namonvesh-logo.png";
import RocketImg from "../assets/rocket.png";
import StatsStrip from "../Components/StatsStrip";
import SciFiGlobe from "../Components/SciFiGlobe";
import EventShowcase from "../Components/EventShowcase";
import CountdownTimer from "../Components/CountdownTimer";

/* Imported Pages for Single Page Scroll */
import Hackathon from "./Hackathon";
import ProjectExpo from "./ProjectExpo";
import Conference from "./Conference";
import Team from "./Team";
import Gallery from "./Gallery";
import Accommodation from "./Accommodation";

import ProblemStatements from "../Components/ProblemStatements";
import CampusMap from "../Components/CampusMap";
import Podcast from "../Components/Podcast";

const Home = () => {
  /* Rocket Launch Logic */
  const [flyAway, setFlyAway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setFlyAway(true);
      } else {
        setFlyAway(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="hero" id="home">
        {/* Center Content */}
        <div className="hero-center">
          <p className="hero-subtitle">
            SSGMCE &nbsp;&nbsp;Presents
          </p>

          <img src={PursuitName} alt="Pursuit 2026" className="pursuit-name" />
          <h2 className="marathi-tagline">ज्ञानातून नवोन्मेष, नवोन्मेषातून विकास</h2>
        </div>

        {/* Custom 3D Globe Animation */}
        <div className="spline-container">
          <SciFiGlobe />
        </div>

        <h2 className="hero-tagline particle-text">
          “Ideate. Innovate. Inspire.”
        </h2>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Rocket Image */}
        <img
          src={RocketImg}
          alt="Rocket"
          className={`rocket ${flyAway ? "fly-away" : ""}`}
        />
        {/* Smoke Effect */}
        <div className={`rocket-smoke ${flyAway ? "active" : ""}`}></div>
      </section>

      <StatsStrip />

      {/* Events Showcase (Intro to Events) */}
      <div style={{ paddingTop: "100px", paddingBottom: "50px" }} id="events-showcase">
        <EventShowcase />
      </div>

      {/* ------------------- STACKED SECTIONS ------------------- */}

      {/* Srujan / Hackathon */}
      <section id="hackathon" style={{ position: "relative" }}>
        <Hackathon />
      </section>

      {/* Problem Statements */}
      <section id="problem-statements">
        <ProblemStatements />
      </section>

      {/* Project Expo */}
      <section id="projectexpo" style={{ position: "relative" }}>
        <ProjectExpo />
      </section>

      {/* Conference */}
      <section id="conference">
        <Conference />
      </section>

      {/* Campus Map */}
      <section id="campus-map">
        <CampusMap />
      </section>

      {/* Accommodation */}
      <section id="accommodation">
        <Accommodation />
      </section>

      {/* Podcast Window */}
      <Podcast />

      {/* Gallery */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* Team */}
      <section id="team">
        <Team />
      </section>
    </>
  );
};

export default Home;
