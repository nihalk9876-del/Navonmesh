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
              <span onClick={() => scrollToSection("hackathon")}>Srijan(Hackthon)</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("projectexpo")}>Ankur(Project Competition &Exhibition)</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("conference")}>UDBHAV(Conference)</span>
            </li>
          </ul>
        </li>
        <li>
          <span onClick={() => scrollToSection("accommodation")}>Accommodation</span>
        </li>
        <li>
          <NavLink to="/cultural" className="nav-item" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
            Cultural
          </NavLink>
        </li>
        <li>
          <span onClick={() => scrollToSection("gallery")}>Gallery</span>
        </li>
        <li>
          <span onClick={() => scrollToSection("team")}>Team</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
