import { useState } from "react";
import "../Styles/navbar.css";
import namonveshfont from "../assets/namonvesh-logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa"; // Import Icon

const Navbar = ({ onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false); // Close menu on click

    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home.
      // The path "/" is the home route in HashRouter (#/)
      navigate("/");

      // If it's a specific section (not just top home), we can try to scroll after a short delay
      if (id !== "home") {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Short delay to allow route change reflection
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}>
        <img src={namonveshfont} alt="Navonmesh Logo" />
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
              <span onClick={() => scrollToSection("hackathon")}>Srijan (Hackathon)</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("projectexpo")}>Ankur (Project Expo)</span>
            </li>
            <li>
              <span onClick={() => scrollToSection("conference")}>Udbhav (Conference)</span>
            </li>
            <li>
              <NavLink to="/pursuit" className="nav-item-dropdown" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
                Pursuit
              </NavLink>
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
        <li>
          <NavLink to="/cosmos" className="nav-item" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
            Cosmos 🚀
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
