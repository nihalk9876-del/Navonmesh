import { useState } from "react";
import "../Styles/navbar.css";
import namonveshfont from "../assets/namonvesh-logo.png";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa"; // Import Icon

const Navbar = ({ onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMenuOpen(false); // Close menu on click
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}>
        <img src={namonveshfont} alt="Pursuit Logo" />
      </div>

      {/* Hamburger Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <span onClick={() => scrollToSection("home")}>Home</span>
        </li>
        <li className="dropdown-container">
          <span className="dropdown-trigger">
            Events <FaChevronDown className="dropdown-arrow" />
          </span>
          <ul className="dropdown-menu">
            <li>
              <span onClick={() => scrollToSection("hackathon")}>Srujan</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("projectexpo")}>Project Expo</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("conference")}>Conference</span>
            </li>
          </ul>
        </li>
        <li>
          <span onClick={() => scrollToSection("accommodation")}>Accommodation</span>
        </li>
        <li>
          <span onClick={() => scrollToSection("gallery")}>Gallery</span>
        </li>
        <li>
          <span onClick={() => scrollToSection("team")}>Team</span>
        </li>

        <li>
          <span onClick={() => scrollToSection("contact")}>Contact</span>
        </li>
        {/* Mobile-only action buttons (optional, or keep them separate) */}
        <div className="mobile-nav-actions">
          <button className="neo-btn">
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
          </button>
          <button className="neo-btn" onClick={(e) => { e.preventDefault(); onRegisterClick(); setIsMenuOpen(false); }}>
            Register
          </button>
        </div>
      </ul>

      {/* Desktop Actions (Hidden on mobile via CSS) */}
      <div className="nav-actions desktop-actions">
        <button className="neo-btn">
          <NavLink to="/login">Login</NavLink>
        </button>
        <button className="neo-btn" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
