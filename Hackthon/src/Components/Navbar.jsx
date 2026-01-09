import "../Styles/navbar.css";
import namonveshfont from "../assets/namonvesh-logo.png";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa"; // Import Icon

const Navbar = ({ onRegisterClick }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we are not on the home page (e.g. login/register), navigate home first then scroll?
      // For now, assuming Single Page Application structure where Home is main.
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}>
        <img src={namonveshfont} alt="Pursuit Logo" />
      </div>

      <ul className="nav-links">
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
      </ul>
      <div className="nav-actions">
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
