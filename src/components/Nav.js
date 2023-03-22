import React, { useState, useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import logo from "../assets/Roamer_Logo.png";

// Styles for the Nav component
const styles = {
  navBar: {
    color: "white",
    position: "relative",
  },
  navList: {
    marginRight: "0",
  },
  navLink: {
    color: "white",
  },
};

// Navigation component that displays links to different pages
function Nav() {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm a")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm a"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div style={styles.navBar} className="container-fluid">
        <div className="d-flex align-items-center">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ marginRight: "2px", width: "75px" }}
            />
          </NavLink>
          <div className="ms-3">{currentTime}</div>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={styles.navLink}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/nearme"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={styles.navLink}
              >
                Near me
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={styles.navLink}
              >
                Contact us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                style={styles.navLink}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
