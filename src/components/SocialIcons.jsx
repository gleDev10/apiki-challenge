import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "../assets/css/social-icons.css";
function SocialIcons() {
  return (
    <ul className="menu-social_icons">
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaPinterest />
        </a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </li>
    </ul>
  );
}
export default SocialIcons;
