import React, { useState, useEffect } from "react";
import "./navbar.css";
import "../styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import home from "../assets/home.png";
import services from "../assets/services.png";
import about from "../assets/about.png";
import contact from "../assets/contact.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 nav-bar">
        <div className="d-flex align-item-center justify-content-around nav-tabs pt-4 pb-2">
          <div className="col-sm-2 col-md-2 col-lg-4 col-xl-4 logo-div">
            <Link className="text-center logo" aria-current="page" to="/">
              <img src={logo} className="img-fluid" alt="" />
            </Link>
          </div>
          <div className="col-sm-8 col-md-8 col-lg-4 col-xl-4 d-flex justify-content-evenly nav">
            <Link
              className="nav-icons fw-bold text-light"
              aria-current="page"
              title="Home"
              to="/home"
            >
              <img src={home} className="icons" alt="" />
            </Link>
            <Link
              className="nav-icons fw-bold text-light"
              aria-current="page"
              title="Services"
              to="/services"
            >
              <img src={services} className="icons" alt="" />
            </Link>
            <Link
              className="nav-icons fw-bold text-light"
              aria-current="page"
              title="About"
              to="/about"
            >
              <img src={about} className="icons" alt="" />
            </Link>
            <Link
              className="nav-icons fw-bold text-light"
              aria-current="page"
              title="Contact"
              to="/contact"
            >
              <img src={contact} className="icons" alt="" />
            </Link>
          </div>
          <div className="col-sm-2 col-md-2 mode col-lg-4 col-xl-4 d-flex">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
