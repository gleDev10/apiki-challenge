import logoSite from "../assets/img/logo-apiki.webp";
import "../assets/css/header-menu.css";
import SocialIcons from "./SocialIcons";
import React from "react";
import { getPosts } from "../services/api";
import { GrClose } from "react-icons/gr";
import { BiMenu } from "react-icons/bi";

function handleMenuMobile(e) {
  e.preventDefault();
  document.querySelector(".header-site.mobile").classList.toggle("active");
  document.querySelector("main").classList.toggle("overlay");
}

const Header = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    // Get post inicial
    async function getAllPosts() {
      try {
        const response = await getPosts("/categories");
        const data = response.data;
        setCategories(data);
      } catch (error) {
        // Lida com erros caso ocorram
        console.error(error);
      }
    }
    getAllPosts();
  }, []);

  return (
    <>
      <header className="header-site desktop">
        <div className="container">
          <div className="row">
            <div className="col col-2" style={{ placeContent: "center" }}>
              <a href="/">
                <img
                  src={logoSite}
                  alt="Logo Apiki"
                  className="header-site__logo"
                />
              </a>
            </div>
            <div className="col col-7 menu">
              <nav
                className="menu__nav"
                role="navigation"
                aria-label="Menu principal"
              >
                <ul className="menu__list">
                  {categories &&
                    categories.map(({ id, name }, index) => {
                      //slug
                      if (index < 4) {
                        return (
                          <li
                            key={id}
                            className="nav-item"
                            id={`menu-item-${id}`}
                          >
                            <a
                              href={`/categories/${id}`}
                              title={name}
                              className="nav-link"
                            >
                              {name}
                            </a>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                  {categories.length > 4 && (
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Mais tópicos
                      </a>
                      <ul className="submenu">
                        {categories.map(({ id, name }, index) => {
                          //slug
                          if (index < 4) {
                            return (
                              <li
                                key={id}
                                className="nav-item"
                                id={`menu-item-${id}`}
                              >
                                <a
                                  href={`/categories/${id}`}
                                  title={name}
                                  className="nav-link"
                                >
                                  {name}
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            <div className="col col-3" style={{ placeContent: "center" }}>
              <SocialIcons />
            </div>
          </div>
        </div>
      </header>
      <header className="header-site mobile">
        <div className="container">
          <div className="row">
            <div className="col col-9" style={{ placeContent: "center" }}>
              <a href="/">
                <img src={logoSite} alt="Logo Apiki" loading="lazy" />
              </a>
            </div>
            <div
              className="col col-3"
              style={{ alignItems: "end", justifyContent: "center" }}
            >
              <div className="nav navbar">
                <button onClick={handleMenuMobile}>
                  <GrClose />
                </button>

                <nav role="navigation" aria-label="Menu principal">
                  <ul>
                    {categories.map(({ id, name }) => {
                      //slug
                      return (
                        <li
                          key={id}
                          className="nav-item"
                          id={`menu-item-${id}`}
                        >
                          <a
                            href={`/categories/${id}`}
                            title={name}
                            className="nav-link"
                          >
                            {name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <SocialIcons />
              </div>
              <button
                onClick={handleMenuMobile}
                style={{ padding: "0", lineHeight: "0" }}
              >
                <BiMenu size={32} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
