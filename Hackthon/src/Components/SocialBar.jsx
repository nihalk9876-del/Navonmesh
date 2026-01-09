import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa6";
import "../styles/sidebar.css";

const SocialBar = () => {
  return (
    <aside className="social-bar">
      <a
        href="https://www.instagram.com/pursuit_ssgmce?igsh=MTQxbHMzb2g3YWI4Yg=="
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.linkedin.com/company/pursuit-ssgmce/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://www.youtube.com/@ssgmceshegaon1983"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube />
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <FaXTwitter />
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a
        href="https://whatsapp.com/channel/0029Vb7cbv2AzNbzCd2xj01B"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
    </aside>
  );
};

export default SocialBar;
