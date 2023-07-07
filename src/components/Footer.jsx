import { FaChevronUp } from "react-icons/fa";
import "../assets/css/footer.css";
import SocialIcons from "./SocialIcons";
function Footer() {
  const year = new Date().getFullYear();
  function handleTopPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col col-4 col-sm-12">
            <p>&copy;{year}. Apiki Blog. Todos os direitos reservados.</p>
            <span style={{ fontSize: "0.7rem" }}>
              Feito por um{" "}
              <a href="https://github.com/gleDev10" target="_black">
                dev
              </a>
            </span>
          </div>
          <div
            className="col col-4 col-sm-12"
            style={{ justifyContent: "center" }}
          >
            <SocialIcons />
          </div>
          <div
            className="col col-4 col-sm-12"
            style={{ justifyContent: "center" }}
          >
            <button onClick={handleTopPage}>
              <FaChevronUp /> back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
