import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">
          © 2026 Navonvesh. All Rights Reserved.
        </p>
        <div className="developer-credit">
          Designed and Developed by{" "}
          <span className="dev-name">
            Team E- Cell
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
